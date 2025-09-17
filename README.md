# Autonomous Driving Evaluation Dataset

🚗 **First dataset collected from autonomous vehicles with intelligent driving mode engaged.**  
Designed for **system-level evaluation of driving safety and reliability**, beyond traditional perception-only datasets.

Project Repository: [https://github.com/KITE-Lab/autonomous-driving-dataset](https://github.com/KITE-Lab/autonomous-driving-dataset)

---

## 📌 Motivation
- Existing datasets (KITTI, nuScenes, Waymo, Argoverse, SemanticKITTI, etc.) mainly focus on **perception tasks**.  
- However, they are collected from **manually driven vehicles**, not autonomous vehicles under intelligent driving.  
- Our dataset is the **first to provide large-scale, real-world autonomous driving logs with active autonomous mode**, enabling **holistic safety evaluation**.

---

## 📊 Dataset Overview
- **Data source**: real-world driving sessions with autonomous driving engaged.  
- **Scale & Coverage**:  
  - Total distance: **~X,000 km**  
  - Total duration: **~X hours**  
  - Trips: **~X,000**  
  - Sequences: **~X,000 (20s clips)**  
  - Frames: **~XX million synchronized images**  
- **Conditions**: urban, suburban, highway, diverse weather & lighting.  
- **Data format**:  
  - Images (JPG/PNG)  
  - Videos (MP4)  
  - GNSS/IMU logs (CSV/JSON)  
  - Calibration files (YAML/JSON)  
  - Safety annotations  

---

## 📦 Data Packaging
- **Frame-level package**: per-frame synchronized images + GNSS/IMU + labels.  
- **Short-sequence package**: 20-second clips for trajectory & behavior analysis.  
- **Long-session video**: entire trips for robustness & long-term evaluation.  

---

## 📑 Dataset Statistics
| Category                        | Value (approx.) |
|---------------------------------|-----------------|
| Total distance                  | ~X,000 km       |
| ├─ Autonomous mileage           | ~X,000 km (~XX%)|
| └─ Manual mileage               | ~X,000 km (~XX%)|
| Total duration                  | ~X hours        |
| Number of trips                 | ~X,000          |
| Sequences (20s clips)           | ~X,000          |
| Frames                          | ~XX million     |
| Safety events (labeled)         | ~X,XXX          |
| 2D bounding boxes               | ~XX million     |
| 3D bounding boxes               | ~X million      |
| Weather                         | Sunny / Rain / Fog / Night |
| Vehicle platforms               | Sedan / SUV / Bus / Truck |

---

## 🛠️ System & Sensor Setup
- **Cameras**: front (wide + narrow), left, right; 120° / 30° FOV, 2592×1944 @ 30 FPS.  
- **GNSS + IMU (GI320)**: RTK-level precision, 20 Hz GNSS, 200 Hz IMU.  
- **Time Sync**: GNSS NMEA + PPS, sub-millisecond alignment.  

---

## 🎯 Annotations
- **Driving States**: autonomous vs manual mode, disengagement logs.  
- **Safety Events**: near-miss, emergency braking, lane departure, etc.  
- **Scenario Labels**: intersections, merges, school zones, toll gates.  
- **Object Labels**: 2D & 3D bounding boxes (vehicles, pedestrians, cyclists, signs).  

---

## 🧪 Baseline Experiments
We provide baseline models to showcase benchmark usage:

| Task                  | Baseline Model       | Metric         | Result (approx.) |
|-----------------------|----------------------|----------------|------------------|
| 2D Object Detection   | Faster R-CNN (R50)   | AP@0.5         | ~XX%             |
| 3D Object Detection   | CenterNet3D baseline | mAP            | ~XX%             |
| Object Tracking       | DeepSORT             | MOTA           | ~XX              |
| Safety Evaluation     | Rule-based controller| Near-miss rate | ~X / 100 km      |
| Disengagement Prediction | LSTM              | F1-score       | ~XX%             |

---

## 📥 Data Access & DevKit
- **Structure**: trip → segment → frame.  
- **Tools**:  
  - Data loader for images, logs, annotations.  
  - Visualization toolkit for synchronized playback.  
  - Conversion utilities (coordinate transforms).  
- **Leaderboard (optional)**: submit benchmark results for comparison.  

---

## 🔒 Privacy & Compliance
- Faces & license plates anonymized (blur + GAN-based DNAT).  
- Data collection follows local traffic regulations & privacy standards.  

---

## 🚀 Contributions & Significance
- **First dataset** focusing on **real-world autonomous driving evaluation**.  
- Enables **safety benchmarking** of autonomous systems.  
- Supports **multi-modal perception + decision-level analysis**.  

---

## ⚠️ Limitations
- Collected only from autonomous driving mode.  
- Expert validation required for safety event labels.  
- Large-scale computation demands high resources.  

---

## 📚 Citation
If you use this dataset in your research, please cite:

```bibtex
@dataset{kite2025autonomous,
  title        = {Autonomous Driving Evaluation Dataset},
  author       = {KITE Lab},
  year         = {2025},
  url          = {https://github.com/KITE-Lab/autonomous-driving-dataset}
}
