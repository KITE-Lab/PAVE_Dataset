# PAVE Dataset

🚗 **PAVE is a real-world end-to-end dataset for production autonomous vehicle evaluation.**  
It is designed for **system-level evaluation of driving safety and reliability**, beyond traditional perception-only datasets.

Project Repository: [https://github.com/KITE-Lab/PAVE_Dataset](https://github.com/KITE-Lab/PAVE_Dataset)  
Paper: [PAVE: An End-to-End Dataset for Production Autonomous Vehicle Evaluation](https://arxiv.org/abs/2511.14185)
Dataset Release: [Public Academic Subset Download](https://hkustgz-my.sharepoint.com/:f:/g/personal/kema_hkust-gz_edu_cn/IgDXyoHKfdGnSZ3JbbidjduMAXxs-Z3NXzm005A_Ix9tr0Q?e=TmWhyH)

---

## 📣 Dataset Release
This repository currently releases a **selected academic subset** of the PAVE dataset for **non-commercial research, method development, and scientific publication**.

- **Release scope**: partial segment of the full PAVE dataset.  
- **Collection setting**: real-world driving logs collected under identified autonomous driving mode with synchronized sensors and high-precision localization.  
- **Supported research**: AV behavior and safety analysis, trajectory evaluation, and benchmark development.  
- **Permitted uses**: academic research, non-commercial evaluation, course projects, theses, dissertations, and scientific papers.  
- **Prohibited uses**: product development, internal industrial benchmarking, deployment, resale, redistribution, or integration into proprietary/commercial systems.  
- **Commercial access**: requires a separate licensing agreement.  
- **Public dataset link**: [Download the released academic subset](https://hkustgz-my.sharepoint.com/:f:/g/personal/kema_hkust-gz_edu_cn/IgDXyoHKfdGnSZ3JbbidjduMAXxs-Z3NXzm005A_Ix9tr0Q?e=TmWhyH)  

### Release Terms
- This release is governed by the **PAVE Academic Non-Commercial License v1.0** in [License.txt](License.txt).  
- Accessing or using this released subset means agreeing to the academic usage restrictions above.  
- Proper citation of the PAVE dataset paper is **mandatory** for any research output using this dataset, even partially.  
- Original PAVE authors should not be listed as co-authors solely due to dataset usage unless they contributed substantially to the research itself.  
- The dataset is provided **"as is"**, without warranty of completeness, accuracy, or fitness for a particular purpose.  

### License and Usage Restrictions
By accessing or using this dataset subset, you agree to the following:

- **Permitted uses**: academic research, scientific investigation, method development, validation, non-commercial benchmarking, course projects, theses, dissertations, and scientific papers.  
- **Prohibited uses**: any commercial or industrial use, including product development, internal performance benchmarking, deployment, consulting, contract research, paid services, redistribution, resale, sublicensing, sharing of the released subset, or use in proprietary / closed-source systems.  
- **Commercial use**: requires a separate licensing agreement with the dataset maintainers.  

### Authorship, Disclaimer, and Ethical Use
- **Authorship**: citing the dataset paper is required and sufficient for acknowledgment; dataset usage alone does not justify co-authorship.  
- **Disclaimer**: the released subset is provided **"as is"** without warranty of any kind, and the maintainers assume no liability for outcomes arising from its use.  
- **Ethical use**: users should uphold data privacy requirements, avoid misuse or misinterpretation, and maintain rigorous scientific and ethical standards.  

### Additional Terms
- **Binding citation requirement**: failure to properly cite the PAVE paper constitutes misuse of the dataset.  
- **Termination**: this license terminates automatically if any of the stated conditions are violated; upon termination, all copies of the dataset must be deleted.  
- **Governing law**: the license shall be governed by the applicable jurisdiction of the dataset owners.  

### Full Dataset and Licensing
- The public release is only a limited academic sample of the full PAVE dataset.  
- For the **full dataset**, **commercial licenses**, **industrial evaluation services**, or **extended annotations / benchmarks**, please contact **kema@hkust-gz.edu.cn**.  
- If your intended use case may be commercial, please contact the maintainers before proceeding.  

### Contact
For access to the **full dataset**, **commercial licenses**, **industrial evaluation services**, or **extended annotations / benchmarks**, please contact **kema@hkust-gz.edu.cn**.

### Acknowledgement
We appreciate your interest in PAVE and encourage you to star the repository and include the required citation in any publication that uses this dataset.

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
- **Current public release**: [academic subset download](https://hkustgz-my.sharepoint.com/:f:/g/personal/kema_hkust-gz_edu_cn/IgDXyoHKfdGnSZ3JbbidjduMAXxs-Z3NXzm005A_Ix9tr0Q?e=TmWhyH).  
- **Repository homepage**: [https://github.com/KITE-Lab/PAVE_Dataset](https://github.com/KITE-Lab/PAVE_Dataset).  
- **Full-dataset or commercial access**: contact **kema@hkust-gz.edu.cn**.  

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
@article{Li2025PAVE,
  title  = {PAVE: An End-to-End Dataset for Production Autonomous Vehicle Evaluation},
  author = {Xiangyu Li and Chen Wang and Yumao Liu and Dengbo He and Jiahao Zhang and Ke Ma},
  journal = {arXiv preprint arXiv:2511.14185},
  year   = {2025}
}
```

This citation is a formal requirement for any research, report, or publication that uses the released subset, even partially.
