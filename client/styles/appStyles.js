import { StyleSheet } from "react-native";

export const GRADIENT_COLORS = ["#0F0F0F", "#1A1A1A"];

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 30,
  },
  logo: {
    width: 100,
    height: 110,
    margin: 10,
    marginTop: 20,
  },
  zestaText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  cameraContainer: {
    flex: 1,
    margin: 10,
    height: "70%",
    width: "90%",
    borderRadius: 50,
    overflow: "hidden",
    marginTop: 0,
  },
  camera: {
    flex: 1,
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 20,
    overflow: "hidden",
  },
  cameraInner: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "column",
  },
  flipButton: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  optionsContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  option: {
    flex: 1,
    marginRight: 5,
    color: "white",
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  optionType: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  optionTypeBlack: {
    color: "black",
  },
  optionOwner: {
    marginTop: 0,
    color: "black",
  },
  optionOwnerRed: {
    color: "red",
  },
  optionImage: {
    width: 150,
    height: 110,
    marginBottom: 1,
    borderRadius: 10,
  },
  actionButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 8,
    margin: 16,
    alignItems: "center",
  },
  actionButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageGallery: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  imageContainer: {
    margin: 5,
  },
  savedImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 5,
  },
  discardButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
    alignItems: "center",
  },
  discardText: {
    color: "white",
    fontSize: 14,
  },
});
