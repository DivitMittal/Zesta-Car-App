## Project Overview

Zesta is a cross-platform mobile application that performs real-time license plate recognition using deep learning. MVP with a vision to become a comprehensive car information app.

**Tech Stack:**
- **Frontend:** React Native (Expo framework) — iOS, Android, and Web
- **Backend:** Node.js WebSocket server (port 2121)
- **ML Processing:** Python with YOLO (Ultralytics), EasyOCR, and OpenCV

## Development Setup

```bash
nix develop    # Enter Nix development shell (or direnv allow)

# Client Setup
cd client && npm install
npm start         # Dev server
npm run android   # Android
npm run ios       # iOS
npm run web       # Web browser

# Server Setup
cd server && npm install
pipenv install    # Python dependencies
node server_node.js
```

## Architecture

### Communication Flow

1. **Mobile App → Node.js**: User captures image → base64 → WebSocket to `ws://192.168.86.177:2121`
2. **Node.js → Python**: Saves base64 to `./uploads/image_base64.txt` → spawns `pipenv run python3 ./recog_exec.py`
3. **Python ML**: YOLO (`./models/best.pt`) detects plate → EasyOCR extracts text → writes to `./result/output.txt`
4. **Response**: Node.js reads output file → sends back via WebSocket → client displays result

### Key Architecture Notes

- **WebSocket State**: Established in `useEffect` with retry logic (max 5 retries, 3s intervals)
- **Synchronization Gap**: Server has 10-second `setTimeout` before reading output file — timing-dependent workaround
- **ML Model**: `server/models/best.pt` is ~50MB, pre-trained for license plate detection

## Important Development Notes

### WebSocket IP Configuration
Hardcoded in `client/App.js:36`:
```javascript
const ws = new WebSocket("ws://192.168.86.177:2121");
```
Update IP to match development machine's local network IP when testing on physical devices.

### Python Environment
- Python version: **3.11** (specified in Pipfile)
- GPU acceleration: `gpu=True` in recog_exec.py:18
- All Python commands via `pipenv run`

## Current Limitations & Known Issues

1. **Hardcoded Server IP** — must manually update for each network
2. **Mock Data** — vehicle information is hardcoded mock data
3. **Timing-Dependent File I/O** — 10-second arbitrary delay for Python processing
4. **No Error Recovery** — client doesn't receive meaningful error messages on ML failure
5. **Single-Shot Processing** — only processes most recent image in array

## Expo Configuration

- SDK: ~49 | EAS project ID: `92cab298-1621-4832-9a36-86de60ce7e90`
- Bundle ID: `com.zesta.lpr` (iOS and Android)
