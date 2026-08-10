# In-Vehicle Data-Collection Equipment Installation Guide

**Version**: v1.0  
**Date**: 2025-09-22  
**Author**: Xiangyu Li  
**Team**: KITE Lab  

This guide describes how to install, connect, and debug the in-vehicle data-collection equipment so that the collection process remains stable and safe. Read this guide carefully before operation.

## 1. Preparation

- Confirm that the vehicle is powered off and the parking brake is engaged.
- Confirm that all equipment, cables, and tools are available.
- Two-person installation is recommended: one person handles equipment mounting while the other handles power and cable routing.

## 2. Equipment List

| Category | Name/model | Quantity | Notes |
|----------|------------|----------|-------|
| Host computer | Industrial PC/edge-computing box | 1 | Ubuntu system with support for multiple cameras |
| Cameras | USB cameras (1080p H.264) | 5 | Two front-facing, one on each side exterior, and one interior camera for the center console |
| Positioning | GNSS receiver + antenna | 1 | Supports RTK/differential positioning; install the antenna longitudinally |
| Attitude sensor | IMU | 1 | Install at the center of the rear axle in the trunk and align it with the vehicle |
| Storage | SSD/hard drive | 1 | Data storage |
| Power module | Vehicle power adapter (12V/24V to 19V/5V) | 1 | Supports a cigarette-lighter connection or direct vehicle power |
| Cables | USB, GNSS, and power cables | Several | Leave sufficient slack |
| Mounts | Camera mounts and host-computer mount | Several | Interior mounting |

## 3. Installation Steps

### 3.1 Install the Host Computer

1. Place the industrial PC in the center armrest compartment or the glove compartment and secure it against movement during driving.
2. Use a mounting bracket or hook-and-loop fastener for additional anti-slip protection.
3. The host computer is configured to power on and start recording automatically when vehicle power is available; it shuts down automatically when the vehicle is powered off.

### 3.2 Install the Cameras

1. Install two forward-facing cameras near the center of the exterior of the windshield, offset as needed, with an unobstructed view.
2. Install the left and right cameras on the corresponding exterior sides of the vehicle, near the doors or windows, with unobstructed horizontal views.
3. Install the interior camera where it can capture the center console completely without reflections or obstruction.
4. After fixing all cameras, check that the images are unobstructed and connect the cameras to the USB ports on the host computer.

### 3.3 Install the GNSS Receiver and IMU

1. Fix the GNSS antenna at the center of the roof in a longitudinal orientation aligned with the north/vehicle-front direction, away from interference sources.
2. Fix the IMU at the center of the rear axle in the trunk and align its orientation with the vehicle.
3. Connect the GNSS receiver and IMU to the host computer using the data cables.

### 3.4 Install the Power System

1. Use the vehicle power adapter to convert vehicle power to the voltage required by the host computer, cameras, and sensors.
2. Route the power cables separately where possible and avoid mixing them with unrelated interior electrical wiring.
3. After wiring, use a multimeter to check that the voltage is stable.

### 3.5 Storage and Debugging

1. Insert the SSD or hard drive and confirm that the storage device is mounted successfully.
2. After the vehicle starts, the host computer powers on automatically and starts the recording program. Camera, GNSS, and IMU data are then collected automatically.
3. When power is removed, the host computer shuts down automatically and saves the data safely.

## 4. Precautions

- **Safety first**: Keep the vehicle powered off during installation to avoid short circuits or electric shock.
- **Secure mounting**: Use brackets or straps for all equipment to prevent loosening caused by bumps.
- **Automatic operation**: The host computer starts recording when powered and shuts down automatically when vehicle power is removed.
- **Stable power**: Do not draw more than the rated current directly from the cigarette lighter. A dedicated power module is recommended.
- **Cable management**: Route and bundle all cables along the edges so that they do not affect driving safety.
- **Dust and water protection**: Protect exterior cameras and the GNSS antenna against dust and water.
- **Regular checks**: Before each collection session, check the power supply, cable connections, and available storage space.

## 5. Common Problems

1. **Camera not detected**: Check whether the USB port is powered and whether the bandwidth limit has been exceeded. Add a USB hub if necessary.
2. **No GNSS signal**: Check whether the antenna has an unobstructed view and whether it is underneath a metal obstruction.
3. **Host computer does not start**: Confirm that the power module is working. The host computer should start automatically after the vehicle is powered on.
4. **Insufficient storage**: Export the data promptly and clean up the storage device regularly.
