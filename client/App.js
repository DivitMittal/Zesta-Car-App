import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
// expo-file-system's classic API moved under /legacy in SDK 52+.
import * as FS from "expo-file-system/legacy";

import { useWebSocket } from "./hooks/useWebSocket";
import { styles, GRADIENT_COLORS } from "./styles/appStyles";
import placeholder from "./assets/fortu.jpeg";

const MOCK_INFO = [
  { id: 1, type: "Captured Image", owner: "", imageSource: null },
  {
    id: 2,
    type: "DL2CAP0941",
    owner: "Divit Mittal, Delhi\n\nPollution Check: Valid\nValid Insurance: Expired\nCriminal Record: Clean",
  },
];

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState("back");
  const cam = useRef(null);
  const [images, setImages] = useState([]);
  const [info, setInfo] = useState(MOCK_INFO);

  const placeholderUri = Image.resolveAssetSource(placeholder).uri;
  const { send, lastMsg } = useWebSocket();

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  useEffect(() => {
    if (lastMsg?.licensePlate) {
      setInfo((prev) => {
        const copy = [...prev];
        copy[1] = { ...copy[1], type: lastMsg.licensePlate };
        return copy;
      });
    }
  }, [lastMsg]);

  const flip = useCallback(() => {
    setFacing((f) => (f === "back" ? "front" : "back"));
  }, []);

  const snap = useCallback(async () => {
    if (!cam.current) return;
    const photo = await cam.current.takePictureAsync();
    const dest = `${FS.documentDirectory}${Date.now()}.jpg`;
    await FS.moveAsync({ from: photo.uri, to: dest });
    setImages((prev) => [...prev, dest]);
  }, []);

  const discard = useCallback(async (uri) => {
    setImages((prev) => prev.filter((u) => u !== uri));
    await FS.deleteAsync(uri, { idempotent: true });
  }, []);

  const submit = useCallback(async () => {
    if (!images.length) return;
    try {
      const uri = images[images.length - 1];
      const b64 = await FS.readAsStringAsync(uri, { encoding: FS.EncodingType.Base64 });
      send(b64);
      setInfo((prev) => {
        const copy = [...prev];
        copy[0] = { ...copy[0], imageSource: uri };
        return copy;
      });
    } catch (e) {
      console.error(e);
    }
  }, [images, send]);

  if (!permission) return <View />;
  if (!permission.granted) return <Text>No camera access</Text>;

  return (
    <LinearGradient colors={GRADIENT_COLORS} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image source={require("./assets/logo.png")} style={styles.logo} />
        <Text style={styles.zestaText}>ZESTA</Text>

        <View style={styles.cameraContainer}>
          <CameraView style={styles.camera} facing={facing} ref={cam}>
            <View style={styles.cameraInner}>
              <TouchableOpacity style={styles.flipButton} onPress={flip} />
            </View>
          </CameraView>
        </View>

        <View style={styles.optionsContainer}>
          {info.map((opt) => (
            <TouchableOpacity key={opt.id} style={styles.option}>
              <Text style={[styles.optionType, opt.id === 1 && styles.optionTypeBlack]}>
                {opt.type}
              </Text>
              {(opt.imageSource || (opt.id === 1 && placeholderUri)) && (
                <Image
                  source={{ uri: opt.imageSource || placeholderUri }}
                  style={styles.optionImage}
                />
              )}
              <Text style={[styles.optionOwner, opt.id === 3 && styles.optionOwnerRed]}>
                {opt.owner}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={snap}>
          <Text style={styles.actionButtonText}>Click!!</Text>
        </TouchableOpacity>

        {images.length > 0 && (
          <View style={styles.imageGallery}>
            {images.map((img, i) => (
              <View key={i} style={styles.imageContainer}>
                <Image source={{ uri: img }} style={styles.savedImage} />
                <TouchableOpacity onPress={() => discard(img)} style={styles.discardButton}>
                  <Text style={styles.discardText}>Discard</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {images.length > 0 && (
          <TouchableOpacity style={styles.actionButton} onPress={submit}>
            <Text style={styles.actionButtonText}>Send to server for evaluation!!</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}
