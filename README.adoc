= Zesta - Your Car App
:doctype: article
:icons: font
:source-highlighter: rouge
:toc: centre
:toclevels: 3
:imagesdir: ./assets

image:https://github.com/DivitMittal/Zesta-Car-App/actions/workflows/flake-check.yml/badge.svg[Flake Check]
image:https://github.com/DivitMittal/Zesta-Car-App/actions/workflows/flake-lock-update.yml/badge.svg[Flake Lock Update]

[.text-center]
image::image_proj.jpg[A phone scannning a car toobtaining relevant information regarding the same, height=400]

Swift license plate recognition deep learning model with a cross-platform front-end to obtain info. pertaining to the vehicle in real-time. This project is currently an MVP, with the vision to become a one-stop car app.

== About The Project

Zesta is a cross-platform mobile application that allows you to scan a vehicle's license plate and get information about it in real-time. The app uses your phone's camera to capture an image of the license plate, sends it to a server for processing, and displays the results.

The backend is powered by a Node.js server that communicates with a Python script. The Python script uses a deep learning model to recognize the license plate from the image.

== Architecture

image::ZestaArchitecture.png[Zesta Architecture Diagram, align="center"]

// Source: The diagram is generated from Graphviz DOT.
// To regenerate: asciidoctor -r asciidoctor-diagram README.adoc
//
// [graphviz, ZestaArchitecture, png]
// ----
// digraph ZestaArchitecture {
//     rankdir="LR";
//     node [shape=box, style="rounded,filled", fillcolor=lightblue, fontname="Helvetica"];
//     edge [fontname="Helvetica", fontsize=10];
//
//     subgraph cluster_client {
//         label="Client (React Native / Expo)";
//         style=filled;
//         fillcolor=lightgray;
//         App [label="Mobile App\n(iOS/Android/Web)"];
//     }
//
//     subgraph cluster_server {
//         label="Backend Server";
//         style=filled;
//         fillcolor=lightgray;
//         NodeJS [label="Node.js Server"];
//         Python [label="Python ML Script"];
//     }
//
//     subgraph cluster_ml {
//         label="Machine Learning Libraries";
//         style=filled;
//         fillcolor=lightgray;
//         YOLO [label="Ultralytics\n(YOLO)"];
//         EasyOCR [label="EasyOCR"];
//         OpenCV [label="OpenCV"];
//     }
//
//     App -> NodeJS [label="  Image (base64)  ", fontsize=9];
//     NodeJS -> Python [label="  Image Data  "];
//     Python -> YOLO [label="  Detect Plate  "];
//     Python -> EasyOCR [label="  Recognize Text  "];
//     Python -> OpenCV [label="  Process Image  "];
//     Python -> NodeJS [label="  License Plate #  "];
//     NodeJS -> App [label="  Vehicle Info  ", fontsize=9];
// }
// ----

== Features

* *Cross-Platform:* Works on iOS, Android, and the web.
* *Real-time Recognition:* Get instant information about a vehicle from its license plate.
* *Camera Integration:* Use your phone's camera to capture license plates.
* *WebSocket Communication:* Real-time, two-way communication between the client and server.

== Tech Stack

[cols="1,1"]
|===
| Technology | Utility

| Expo (React-Native Framework)
| iOS, Android, Web Frontends

| NodeJS
| Server Backend

| Python
| ML Tasks

| Ultralytics (YOLO)
| License Plate Detection

| EasyOCR
| Optical Character Recognition

| OpenCV
| Image Processing

| WebSockets
| Real-time Communication
|===

== Usage

. Open the app on your device.
. Point your camera at a license plate and tap the "Click!!" button.
. Tap the "Send to server for evaluation!!" button.
. Henceforth, obtain license plate number and other relevant vehicle information.

== Under Development

This project is currently an MVP. The vision is to develop it into a multi-feature, one-stop car app. Future features could include:

* *Integration with Indian RTO's Parivahan Database:* To fetch official vehicle and owner data.
* *Challan/Fine Tracking:* Check for any outstanding traffic fines.
* *Insurance and PUC Status:* Verify the validity of the vehicle's insurance and Pollution Under Control (PUC) certificate.
* *Registered Owner Information:* Display details of the registered owner.
* *Digital Garage:* A feature to manage your own vehicles, track repairs, and set reminders for insurance renewals, etc.
* *All-in-One:* Access all these features simply by taking a picture of a license plate.