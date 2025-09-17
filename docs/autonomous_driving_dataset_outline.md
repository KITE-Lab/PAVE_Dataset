# Outline of Autonomous Driving Evaluation Dataset

Project Repository: [https://github.com/KITE-Lab/autonomous-driving-dataset/](https://github.com/KITE-Lab/autonomous-driving-dataset/)

---

## Motivation
- Existing datasets (KITTI, nuScenes, Waymo, Argoverse, SemanticKITTI, etc.) mainly focus on **perception tasks** such as object detection, segmentation, and tracking.  
- However, they are **collected from manually driven vehicles**, not from vehicles under intelligent driving mode.  
- There is a lack of datasets that directly reflect **the behavior and performance of autonomous driving systems in real operation**.  
- Our dataset is the **first dataset collected from autonomous vehicles while intelligent driving is activated**, aiming to support **system-level evaluation of driving safety**.  

---

## Dataset Overview
- **Data source**: real-world driving sessions with autonomous driving engaged.  
- **Purpose**: designed for **evaluation and benchmarking of autonomous driving systems** rather than only perception tasks.  
- **Scale & Coverage**:  
  - Total driving distance: **~X,000 km**.  
  - Total duration: **~X hours** of driving logs.  
  - Number of sequences: **~X,000 segments**, covering diverse traffic conditions.  
  - Frames: **~XX million synchronized images**.  
- **Conditions**: includes urban, suburban, and highway driving under various weather and traffic situations.  
- **Data format**: image sequences (JPG/PNG), videos (MP4), GNSS/IMU logs (CSV/JSON), calibration files (YAML/JSON), and evaluation labels.  

### Data Packaging & Formats
- **Frame-level package**: each frame contains synchronized multi-sensor data (images, GNSS/IMU, annotations, timestamps).  
- **Short-sequence package**: 20-second continuous driving clips with full temporal context for trajectory and behavior analysis.  
- **Long-session video**: extended recordings of entire trips for holistic evaluation of system robustness and long-term safety performance.  

---

## Dataset Statistics
| Category                        | Value (approx.)       |
|---------------------------------|-----------------------|
| Total distance                  | ~X,000 km             |
| ├─ Autonomous driving mileage   | ~X,000 km (~XX%)      |
| └─ Manual driving mileage       | ~X,000 km (~XX%)      |
| Total duration                  | ~X hours              |
| Number of trips                 | ~X,000                |
| Number of sequences             | ~X,000 (20s clips)    |
| Total frames                    | ~XX million           |
| Cities covered                  | ~X                    |
| Total area                      | ~X,000 km²            |
| Disengagement events            | ~X,XXX                |
| Number of safety events labeled | ~X,XXX (near-miss, emergency braking, lane departure, etc.) |
| 2D bounding boxes (total)       | ~XX million           |
| 3D bounding boxes (total)       | ~X million            |
| Weather conditions              | Sunny, cloudy, rainy, foggy, night |
| Vehicle types                   | Sedan, SUV, Bus, Truck (if applicable) |


---

## Scenario Coverage
- **Road Types**: highway, arterial, residential, suburban, rural.  
- **Driving Events**: lane changes, merges, roundabouts, overtaking, school zones, toll gates, parking lots.  
- **Traffic Participants**: vehicles, pedestrians, cyclists, buses, trucks, motorbikes.  
- **Environment Conditions**: day/night, rain, fog, tunnels, strong backlight.  
- **Corner Cases**: emergency braking, near-miss collisions, cut-ins, temporary lane markings, construction zones.  
- **Vehicle Categories**: dataset includes data collected with **different vehicle platforms** (e.g., sedan, SUV, bus, truck), allowing cross-vehicle evaluation of autonomous driving performance.  


---

## Driving States & Intervention Logs
- **Driving States**:  
  - Clear distinction between **autonomous mode** and **manual mode**.  
  - Transitions are precisely annotated with timestamps.  

- **Intervention / Disengagement Statistics**:  
  - Total disengagements recorded: **~X,XXX**.  
  - Average disengagement rate: **~X per 100 km**.  

- **Disengagement Reasons (annotated)**:  
  - **Safety risk**: imminent collision, obstacle avoidance.  
  - **System error**: perception or planning failure.  
  - **Rule-based constraint**: road conditions where autonomous mode is not permitted.  
  - **Driver precautionary takeover**: conservative human override.  

- **Distribution by Category**:  
  - Safety-related disengagements: ~XX%  
  - System perception errors: ~XX%  
  - Planning/decision conflicts: ~XX%  
  - Driver precautionary actions: ~XX%  

- **Event Logs**:  
  - Each disengagement is logged with **multi-sensor context (images, GNSS/IMU, planned trajectory, executed trajectory)**.  
  - Enables root cause analysis and benchmarking across systems.  

---

## System & Sensor Setup
- **Cameras**:  
  - **Front-facing**:  
    - One **wide-angle camera** with **120° FOV** (2592 × 1944 @ 30 FPS).  
    - One **narrow-angle camera** with **30° FOV** (2592 × 1944 @ 30 FPS) for long-range perception.  
  - **Side cameras**:  
    - Left and right, each with **120° FOV** (2592 × 1944 @ 30 FPS).  
    - Together with the front cameras, these provide a **comprehensive forward and lateral coverage**.  
  - **Camera Features**:  
    - Support for **Wide Dynamic Range (WDR)** to handle high-contrast lighting (e.g., tunnels, sunset).  
    - **Backlight compensation / HDR** capability for robust perception in strong sunlight or night scenes.  

- **High-precision GNSS + IMU (GI320)**:  
  - **RTK Differential GNSS**:  
    - Horizontal accuracy: **0.8 cm + 1 ppm**.  
    - Vertical accuracy: **1.5 cm + 1 ppm**.  
    - Update rate: **20 Hz**.  
  - **IMU**:  
    - Output frequency: **200 Hz**.  
    - Gyroscope bias stability: **0.5°/h (Allan variance)**.  
    - Accelerometer bias stability: **50 μg (10s smoothing)**.  
    - Attitude accuracy (with GNSS):  
      - Roll/Pitch: **0.03° (static), 0.1° (dynamic)**.  
      - Heading: **0.05° (static), 0.1° (dynamic)**.  

- **Time Synchronization**:  
  - All cameras and onboard acquisition devices are synchronized using **GNSS NMEA messages** and **PPS (Pulse Per Second) signals**.  
  - Synchronization accuracy reaches the **sub-millisecond level**, ensuring consistent time stamping across all sensor modalities.  
  - GNSS/IMU serves as the **global reference clock** for trajectory reconstruction and system-level evaluation.  


---

## Sensor Calibration
- **Intrinsic Calibration**:  
  - Each camera is calibrated for focal length, principal point, distortion coefficients (radial/tangential).  
  - Stored in **camera intrinsics files (YAML/JSON)** for reproducibility.  

- **Extrinsic Calibration**:  
  - Rigid body transformations between cameras, GNSS, and IMU.  
  - Provided as **rotation matrices** and **translation vectors**.  
  - Calibration performed using **checkerboard-based vision methods** and **GNSS/IMU alignment**.  

- **Temporal Calibration**:  
  - PPS ensures sub-millisecond timestamp alignment.  
  - Latency between sensors characterized and documented.  

---

## Coordinate Systems
- **Camera Coordinate System**:  
  - Origin at the camera optical center, x-axis right, y-axis down, z-axis forward.  

- **IMU Coordinate System**:  
  - Origin at IMU center, axes aligned with body frame.  

- **Vehicle Coordinate System (Body Frame)**:  
  - Origin at rear axle center, x-axis forward, y-axis left, z-axis upward.  

- **Global Coordinate System**:  
  - Earth-Centered Earth-Fixed (ECEF) or ENU (East-North-Up) derived from GNSS RTK.  

- **Transformations**:  
  - Full set of **extrinsic matrices** provided to transform data across all coordinate systems (camera ↔ IMU ↔ vehicle ↔ global).  
  - Consistent with industry conventions for autonomous driving evaluation.  

---

## Annotation & Labeling
- **Driving States**:  
  - Explicit distinction between **autonomous driving mode** and **manual driving mode**.  
  - Disengagement events and transitions are labeled with high precision.  

- **Scenario Annotations**:  
  - Diverse intelligent driving scenarios are labeled (e.g., intersections, roundabouts, lane changes, merges, special road segments).  
  - All scenario data are annotated through a combination of **professional annotation tools** and **manual expert validation**.  

- **Object-Level Labels**:  
  - **3D bounding boxes**: vehicles, pedestrians, cyclists, traffic signs.  
  - **2D bounding boxes**: image-plane annotations consistent with 3D labels. 

---

## Privacy & Compliance
- **Anonymization**:  
  - Faces and license plates are blurred or replaced with GAN-based anonymization.  
- **Compliance**:  
  - Data collection and processing follow local traffic data regulations and privacy protection standards.  
- **Ethical Considerations**:  
  - Ensures safe and lawful data collection from real roads.  

---

## Evaluation Metrics
- **Safety-focused metrics**:  
  - Collision and near-miss rate.  
  - Lane-keeping stability.  
  - Compliance with traffic rules.  
  - Frequency and cause of human interventions.  
- **System performance metrics**:  
  - Response time to dynamic objects.  
  - Consistency of planned vs executed trajectories.  
  - Comfort-related indicators (acceleration, jerk).  
- **Composite safety score**: integrating multiple metrics into a standardized evaluation index.  

---

## Experiments & Analysis
- **Comparative evaluation**: benchmark different autonomous driving stacks.  
- **Failure case study**: analyze root causes of disengagement and unsafe events.  
- **Generalization**: performance across different roads, weather, and traffic conditions.  
- **Scalability**: how autonomous systems behave in long-duration and high-mileage driving.  

---

## Data Access & DevKit
- **Dataset Structure**: trip → segment → frame hierarchy.  
- **APIs & Tools**:  
  - Data loader for images, logs, annotations.  
  - Visualization toolkit for synchronized playback.  
  - Conversion utilities (e.g., coordinate transforms).  
- **Leaderboard** (optional): benchmark results submission and comparison.  

---

## Contributions & Significance
- **First dataset** focusing on **real-world autonomous driving evaluation** (not just perception).  
- Provides **synchronized multi-modal sensor data + system decision logs**.  
- Enables **holistic safety analysis** of autonomous driving algorithms.  
- Establishes a **benchmark for evaluating autonomous vehicle safety and reliability**.  

---

## Limitations
- Collected only from vehicles under intelligent driving mode → not directly comparable to traditional perception datasets.  
- Annotation and labeling of safety events may require expert validation.  
- Computational cost for large-scale evaluation remains high.  

---

## Appendix: Sensor Setup & Calibration Details
- **Camera Installation**:  
  - Mounting positions and relative orientation (front, side-left, side-right).  
  - Height above ground and relative offsets to vehicle body frame.  
- **GNSS/IMU Installation**:  
  - Placement near vehicle center of gravity, with alignment to vehicle frame.  
- **Calibration Files**: full YAML/JSON configs with intrinsics, extrinsics, and time sync offsets.  
- **Visualization**: diagrams showing sensor layout and coordinate frames.