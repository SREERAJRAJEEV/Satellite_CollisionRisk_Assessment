import requests
import matplotlib.pyplot as plt
from skyfield.api import load, EarthSatellite
from datetime import datetime, timezone, timedelta

# Load the timescale for Skyfield
ts = load.timescale()

# Function to fetch TLE by satellite name
def get_tle_by_name(satellite_name):
    url = "https://celestrak.org/NORAD/elements/tle-new.txt"
    response = requests.get(url)

    if response.status_code != 200:
        raise ValueError("Failed to fetch TLE data.")

    lines = response.text.strip().split("\n")

    for i in range(len(lines) - 2):
        if lines[i].strip() == satellite_name:
            return lines[i], lines[i + 1], lines[i + 2]  # Name, Line 1, Line 2

    raise ValueError("Satellite TLE data not found.")

# Function to generate trajectory
def generate_trajectory(satellite_name):
    # Get TLE data for the given satellite
    tle_name, tle_line1, tle_line2 = get_tle_by_name(satellite_name)

    # Create satellite object
    sat = EarthSatellite(tle_line1, tle_line2, tle_name, ts)

    # Get current UTC time
    current_time = datetime.now(timezone.utc)

    # Generate timestamps for the next 100 days
    times = ts.utc(
        [current_time.year] * 100,
        [current_time.month] * 100,
        [(current_time + timedelta(days=i)).day for i in range(100)]
    )

    # Compute satellite positions
    geocentric_positions = sat.at(times)

    # Extract X, Y, Z coordinates
    x, y, z = geocentric_positions.position.km

    # Plot trajectory
    fig = plt.figure(figsize=(8, 6))
    ax = fig.add_subplot(111, projection='3d')
    ax.plot(x, y, z, label=f"Trajectory of {satellite_name}")
    ax.set_xlabel("X (km)")
    ax.set_ylabel("Y (km)")
    ax.set_zlabel("Z (km)")
    ax.set_title(f"Trajectory of {satellite_name}")
    ax.legend()

    # Save and return image path
    image_path = f"static/{satellite_name}_trajectory.png"
    plt.savefig(image_path)
    plt.close()

    return image_path