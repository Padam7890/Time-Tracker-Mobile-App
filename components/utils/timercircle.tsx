import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg"

interface TimerCircleProps {
  minutes: number
  hours: number
  seconds: number
  totalMinutes: number
  size?: number

  strokeWidth?: number
}

const TimerCircle: React.FC<TimerCircleProps> = ({ hours, minutes, seconds, totalMinutes, size = 280, strokeWidth = 20 }) => {
  // Calculate the progress percentage
  const totalSeconds = totalMinutes * 60
  const currentSeconds = minutes * 60 + seconds
  const progress = currentSeconds / totalSeconds

  // Calculate SVG parameters
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference * (1 - progress)

  // Center position
  const center = size / 2

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#E0E0FF" />
            <Stop offset="100%" stopColor="#8A2BE2" />
          </LinearGradient>
        </Defs>

        {/* Background circle */}
        <Circle cx={center} cy={center} r={radius} stroke="#E9E9FF" strokeWidth={strokeWidth} fill="transparent" />

        {/* Progress circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          transform={`rotate(-90, ${center}, ${center})`}
        />
      </Svg>

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {String(hours).padStart(2,"0") } : {String(minutes).padStart(2, "0")} : {String(seconds).padStart(2, "0")}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  timeContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
})

export default TimerCircle

