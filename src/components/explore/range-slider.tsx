import { useRef, useState } from "react";
import { PanResponder, Text, View } from "react-native";

const THUMB = 22;
const TRACK_H = 4;
const BARS = [2, 3, 4, 5, 6, 8, 10, 13, 17, 22, 20, 17, 14, 10, 8, 6, 5, 4, 3, 2, 2, 2];
const MAX_BAR = Math.max(...BARS);
const BAR_MAX_H = 60;

interface Props {
  min: number;
  max: number;
  low: number;
  high: number;
  onLowChange: (v: number) => void;
  onHighChange: (v: number) => void;
  prefix?: string;
  showBars?: boolean;
}

export default function RangeSlider({
  min,
  max,
  low,
  high,
  onLowChange,
  onHighChange,
  prefix = "",
  showBars = false,
}: Props) {
  const [trackWidth, setTrackWidth] = useState(0);
  const trackRef = useRef(0);

  // Keep mutable refs so PanResponder callbacks never go stale
  const lowRef = useRef(low);
  const highRef = useRef(high);
  const onLowRef = useRef(onLowChange);
  const onHighRef = useRef(onHighChange);
  lowRef.current = low;
  highRef.current = high;
  onLowRef.current = onLowChange;
  onHighRef.current = onHighChange;

  const lowStartRef = useRef(0);
  const highStartRef = useRef(0);

  const toX = (val: number, tw: number) =>
    ((val - min) / (max - min)) * (tw - THUMB);

  const toVal = (x: number, tw: number) =>
    Math.round(min + (x / (tw - THUMB)) * (max - min));

  const lowPR = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        lowStartRef.current = toX(lowRef.current, trackRef.current);
      },
      onPanResponderMove: (_, { dx }) => {
        const tw = trackRef.current;
        const cap = toX(highRef.current, tw) - 1;
        const x = Math.max(0, Math.min(cap, lowStartRef.current + dx));
        onLowRef.current(toVal(x, tw));
      },
    })
  ).current;

  const highPR = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        highStartRef.current = toX(highRef.current, trackRef.current);
      },
      onPanResponderMove: (_, { dx }) => {
        const tw = trackRef.current;
        const floor = toX(lowRef.current, tw) + 1;
        const x = Math.max(floor, Math.min(tw - THUMB, highStartRef.current + dx));
        onHighRef.current(toVal(x, tw));
      },
    })
  ).current;

  const lowX = trackWidth > 0 ? toX(low, trackWidth) : 0;
  const highX = trackWidth > 0 ? toX(high, trackWidth) : 0;

  return (
    <View className="gap-2">
      {/* Histogram bars — optional */}
      {showBars && (
        <View
          className="flex-row items-end gap-px"
          style={{ height: BAR_MAX_H }}
          pointerEvents="none"
        >
          {BARS.map((h, i) => (
            <View
              key={i}
              className="flex-1 rounded-sm"
              style={{ height: (h / MAX_BAR) * BAR_MAX_H, backgroundColor: "#8B5DFF26" }}
            />
          ))}
        </View>
      )}

      {/* Track + thumbs */}
      <View
        style={{ height: THUMB }}
        onLayout={(e) => {
          const w = e.nativeEvent.layout.width;
          trackRef.current = w;
          setTrackWidth(w);
        }}
      >
        {/* Gray background track */}
        <View
          style={{
            position: "absolute",
            left: THUMB / 2,
            right: THUMB / 2,
            top: THUMB / 2 - TRACK_H / 2,
            height: TRACK_H,
            backgroundColor: "#E4E4E4",
            borderRadius: 2,
          }}
        />

        {/* Purple active track */}
        {trackWidth > 0 && (
          <View
            style={{
              position: "absolute",
              left: lowX + THUMB / 2,
              width: Math.max(0, highX - lowX),
              top: THUMB / 2 - TRACK_H / 2,
              height: TRACK_H,
              backgroundColor: "#8B5DFF",
              borderRadius: 2,
            }}
          />
        )}

        {/* Low thumb */}
        <View
          {...lowPR.panHandlers}
          style={{
            position: "absolute",
            left: lowX,
            top: 0,
            width: THUMB,
            height: THUMB,
            borderRadius: THUMB / 2,
            backgroundColor: "white",
            borderWidth: 2,
            borderColor: "#8B5DFF",
            shadowColor: "#8B5DFF",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 4,
          }}
        />

        {/* High thumb */}
        <View
          {...highPR.panHandlers}
          style={{
            position: "absolute",
            left: highX,
            top: 0,
            width: THUMB,
            height: THUMB,
            borderRadius: THUMB / 2,
            backgroundColor: "white",
            borderWidth: 2,
            borderColor: "#8B5DFF",
            shadowColor: "#8B5DFF",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 4,
          }}
        />
      </View>

      {/* Value labels below thumbs */}
      {trackWidth > 0 && (
        <View style={{ height: 20, position: "relative" }}>
          <Text
            className="font-rubik-medium text-purple text-sm absolute"
            style={{ left: lowX }}
          >
            {prefix}
            {low.toLocaleString()}
          </Text>
          <Text
            className="font-rubik-medium text-purple text-sm absolute"
            style={{ left: highX }}
          >
            {prefix}
            {high.toLocaleString()}
          </Text>
        </View>
      )}
    </View>
  );
}
