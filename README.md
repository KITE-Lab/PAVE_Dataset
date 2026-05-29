# PAVE Dataset

PAVE is a real-world end-to-end dataset for production autonomous vehicle evaluation. It is designed for system-level analysis of autonomous-driving behavior, safety, and trajectory quality beyond perception-only benchmarks.

## Resources

| Resource | Link |
|---|---|
| Paper | [PAVE: An End-to-End Dataset for Production Autonomous Vehicle Evaluation](https://arxiv.org/abs/2511.14185) |
| Project website | [https://kite-lab.github.io/PAVE_Dataset/](https://kite-lab.github.io/PAVE_Dataset/) |
| Dataset download | [Public academic subset on OneDrive/SharePoint](https://hkustgz-my.sharepoint.com/:f:/g/personal/kema_hkust-gz_edu_cn/IgDXyoHKfdGnSZ3JbbidjduMAXxs-Z3NXzm005A_Ix9tr0Q?e=TmWhyH) |
| Dataset repository | [https://github.com/KITE-Lab/PAVE_Dataset](https://github.com/KITE-Lab/PAVE_Dataset) |
| Repair and calibration tools | [https://github.com/KITE-Lab/PAVE_scripts_preprocessing_calibration_release](https://github.com/KITE-Lab/PAVE_scripts_preprocessing_calibration_release) |

## Dataset Release Status

The files currently available on the public OneDrive/SharePoint page are legacy previous-release archives. They are useful for inspection, reproduction, and early research exploration, but they should not be treated as the final corrected benchmark release.

An upcoming fixed release is being prepared. That corrected release will supersede the legacy archives once it is published.

### Legacy Archives Currently On OneDrive

| Archive | Size | Extracts to | Contents | Frame groups | JPG images |
|---|---:|---|---|---:|---:|
| `PAVE_1.0_2025.12.15.zip` | ~17.34 GB | `PAVE_1.0_2025.12.15/` | `data.json` + `images/` | 10,779 | 42,486 |
| `PAVE_2.0_2025.12.15.zip` | ~11.74 GB | `PAVE_2.0_2025.12.15/` | `data.json` + `images/` | 10,202 | 34,892 |
| `PAVE_1.0_2025.11.zip` | ~31.37 GB | `PAVE_1.0/` | `data.json` + `images_blurred/` | 12,373 | 49,123 |

Each archive contains a selected academic subset released for non-commercial research, method development, and scientific publication. For the full dataset, commercial licensing, industrial evaluation services, or extended annotations and benchmarks, contact `kema@hkust-gz.edu.cn`.

## What Is In The Dataset

The public archives contain synchronized camera frame groups, scenario metadata, 2D perception annotations where available, and ego-vehicle trajectory states derived from GNSS/INS logs.

Main modalities and labels:

- Camera images from up to four vehicle cameras: `front_wide`, `front_tele`, `left_wide`, and `right_wide`.
- Driver mode labels: `auto` or `human`.
- Driver intent labels: straight/static, left turn, and right turn.
- Scenario annotations such as area type, lighting, weather, road surface, vehicle density, vulnerable-road-user density, and traffic-light presence.
- Per-frame annotations including 2D detection boxes, traffic lights, and traffic signs where available.
- Ego trajectory states with position, velocity, and acceleration in meters and SI units.
- Camera calibration fields. In the legacy archives, these fields may be complete, coarse, or `null` depending on the frame group and archive.

## Extracted Layout

After unzipping one archive, the directory has this structure:

```text
PAVE_xxx/
|-- data.json
`-- images/ or images_blurred/
    `-- <framegroup_id>_<YYYYMMDD_HHMMSS.mmm>_<camera_type>[_1080].jpg
```

Examples:

```text
PAVE_1.0_2025.12.15/
|-- data.json
`-- images/
    |-- 60_20250726_161705.700_front_wide.jpg
    `-- 60_20250726_161705.700_left_wide.jpg

PAVE_1.0/
|-- data.json
`-- images_blurred/
    `-- 209214_20251024_204834.750_front_wide.jpg
```

The `images/` folder is used by the December 2025 legacy archives. The older November 2025 archive uses `images_blurred/`.

## `data.json` Format

`data.json` is a top-level JSON array. Each element is one frame group centered at a reference timestamp.

```json
[
  {
    "framegroup_id": 60,
    "frames": [
      {
        "image_name": "60_20250726_161705.700_front_wide.jpg",
        "camera_type": "front_wide",
        "camera_calibration": {
          "intrinsic": null,
          "distortion": null,
          "extrinsic": null
        },
        "annotations": {
          "detection_2d_boxes": [],
          "traffic_lights": [],
          "traffic_signs": []
        }
      }
    ],
    "timestamp": 1753564625700,
    "driver_intent": 2,
    "driver_mode": "auto",
    "objects": [],
    "scenario_annotation": {
      "area_type": "urban",
      "lighting": "day",
      "weather": "clear",
      "road_surface_type": "paved",
      "vehicle_density": "mid",
      "vru_density": "low",
      "has_traffic_light": false,
      "traffic_sign_category": null,
      "visibility_m": null,
      "temperature_c": null,
      "precipitation_mm_h": null,
      "wind_kph": null,
      "scene_tags": [],
      "notes": null,
      "source": null,
      "confidence": null
    },
    "language_description": null,
    "trajectory": [
      {
        "timestamp": 1753564619800,
        "x_m": -0.008037282457086469,
        "y_m": 0.04272434706854358,
        "vx_mps": 0.019563811046150875,
        "vy_mps": -0.0024485821990674617,
        "ax_mps2": -0.00030312884726685363,
        "ay_mps2": -0.00015253626029776424
      }
    ]
  }
]
```

### Top-Level Frame Group Fields

| Field | Type | Description |
|---|---|---|
| `framegroup_id` | integer | Frame-group identifier used in image filenames. |
| `timestamp` | integer | Reference Unix timestamp in milliseconds. |
| `driver_mode` | string | Driving mode label: `auto` or `human`. |
| `driver_intent` | integer | Intent label: `1 = straight/static`, `2 = left turn`, `3 = right turn`. |
| `frames` | array | One to four camera frame records. Legacy archives may have fewer than four frames for some frame groups. |
| `objects` | array | Reserved top-level object list. Legacy archives primarily store per-frame annotations under `frames[].annotations`. |
| `scenario_annotation` | object | Scene-level metadata for weather, lighting, road type, traffic context, and density. |
| `language_description` | string or null | Optional natural-language description. |
| `trajectory` | array | Ego-vehicle trajectory states around the reference timestamp. |

### `frames[]` Fields

| Field | Type | Description |
|---|---|---|
| `image_name` | string | Relative image filename under `images/` or `images_blurred/`. |
| `camera_type` | string | Camera name, usually `front_wide`, `front_tele`, `left_wide`, or `right_wide`. |
| `camera_calibration.intrinsic` | string, array, or null | 3x3 camera intrinsic matrix. Legacy archives may store it as a stringified matrix or `null`. |
| `camera_calibration.distortion` | string, array, or null | Distortion coefficients. Legacy archives may store them as a stringified vector or `null`. |
| `camera_calibration.extrinsic` | string, array, or null | 4x4 camera-to-vehicle transform. Legacy archives may store it as a stringified matrix or `null`. |
| `annotations.detection_2d_boxes` | array | 2D boxes with fields such as `category`, `bbox`, `score`, and `track_id`. |
| `annotations.traffic_lights` | array | Traffic-light annotations where available. |
| `annotations.traffic_signs` | array | Traffic-sign annotations where available. |

### `trajectory[]` Fields

| Field | Type | Unit | Description |
|---|---|---|---|
| `timestamp` | integer | ms | Unix timestamp for this trajectory state. |
| `x_m` | number | m | Longitudinal position in the local ego-aligned frame. |
| `y_m` | number | m | Lateral position in the local ego-aligned frame. |
| `vx_mps` | number | m/s | Longitudinal velocity. |
| `vy_mps` | number | m/s | Lateral velocity. |
| `ax_mps2` | number | m/s^2 | Longitudinal acceleration. |
| `ay_mps2` | number | m/s^2 | Lateral acceleration. |

## Minimal Loading Example

```python
import json
from pathlib import Path

root = Path("PAVE_1.0_2025.12.15")
image_root = root / "images"
if not image_root.exists():
    image_root = root / "images_blurred"

with (root / "data.json").open("r", encoding="utf-8") as f:
    framegroups = json.load(f)

sample = framegroups[0]
print(sample["framegroup_id"], sample["timestamp"], sample["driver_mode"])

for frame in sample["frames"]:
    image_path = image_root / frame["image_name"]
    print(frame["camera_type"], image_path)
```

## Known Issues In Legacy Archives

The currently published OneDrive/SharePoint archives are legacy previous-release archives. Known issues may include:

- Camera and GNSS/INS timestamps may be misaligned because of acquisition hardware timing offsets.
- Camera extrinsic calibration may be missing or coarse in some records.
- Some frame groups have fewer than four camera frames.
- Legacy archives should not be treated as the final corrected benchmark.

Users who only need the public academic dataset should prefer the upcoming fixed release once it is available.

## Repair And Calibration Workflow

The repair and calibration scripts are published in [KITE-Lab/PAVE_scripts_preprocessing_calibration_release](https://github.com/KITE-Lab/PAVE_scripts_preprocessing_calibration_release). These tools are mainly for maintainers and advanced users who need to regenerate or repair raw/preprocessed datasets. Users who only downloaded the legacy OneDrive archives should generally wait for the upcoming fixed release instead of trying to patch the legacy archives manually.

For raw or preprocessed recordings, run the preprocessing pipeline:

```bash
git clone https://github.com/KITE-Lab/PAVE_scripts_preprocessing_calibration_release.git
cd PAVE_scripts_preprocessing_calibration_release/data_preprocessing
./run_pipeline.sh /path/to/raw_dataset
```

The pipeline renames cameras, estimates per-camera time offsets, generates a Unified Time Axis, extracts synchronized frames, parses RTK/GNSS data, converts synchronized data to JSON, and validates completeness.

For calibration repair, use the `intrisic_extrinsic_calibration/` directory. The directory name is intentionally spelled this way in the released tools repository.

```bash
cd PAVE_scripts_preprocessing_calibration_release/intrisic_extrinsic_calibration

python retrieve_turn_images.py
python calibrate_all_cameras.py
python update_dataset_calibrations.py --input /path/to/dataset_json_dir
python validate_projections.py
```

The calibration workflow selects useful turning samples, refines camera extrinsics by projecting future trajectories and ground grids onto camera images, writes intrinsic/distortion/extrinsic values back into dataset JSON files, and validates projections.

## License And Usage Restrictions

This repository releases a selected academic subset of the PAVE dataset for non-commercial research, method development, education, and scientific publication.

By accessing or using this dataset subset, you agree to the following terms:

- Permitted uses: academic research, scientific investigation, method development, validation, non-commercial benchmarking, course projects, theses, dissertations, and scientific papers.
- Prohibited uses: commercial or industrial use, product development, internal industrial benchmarking, deployment, consulting, contract research, paid services, redistribution, resale, sublicensing, sharing of the released subset, or integration into proprietary or closed-source systems.
- Commercial use requires a separate licensing agreement with the dataset maintainers.
- Proper citation of the PAVE paper is required for any research output using the dataset, even partially.
- Dataset usage alone does not justify listing the original PAVE authors as co-authors unless they contributed substantially to the research itself.
- The dataset is provided "as is", without warranty of completeness, accuracy, or fitness for a particular purpose.

See [License.txt](License.txt) for the full PAVE Academic Non-Commercial License v1.0.

## Privacy And Ethical Use

Users should uphold applicable privacy requirements, avoid misuse or misinterpretation of the data, and maintain rigorous scientific and ethical standards. Do not redistribute the released subset or use it in commercial or proprietary systems without a separate license.

## Contact

For the full dataset, commercial licenses, industrial evaluation services, or extended annotations and benchmarks, contact:

```text
kema@hkust-gz.edu.cn
```

## Citation

If you use this dataset in your research, reports, or publications, cite the PAVE dataset paper:

```bibtex
@article{Li2025PAVE,
  title  = {PAVE: An End-to-End Dataset for Production Autonomous Vehicle Evaluation},
  author = {Xiangyu Li and Chen Wang and Yumao Liu and Dengbo He and Jiahao Zhang and Ke Ma},
  journal = {arXiv preprint arXiv:2511.14185},
  year   = {2025}
}
```

This citation is a formal requirement for any research, report, or publication that uses the released subset, even partially.
