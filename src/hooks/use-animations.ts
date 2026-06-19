import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

/** Fade in + slide up from below on mount. */
export function useFadeSlideIn(delay = 0) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 480,
        delay,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        delay,
        friction: 10,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return { opacity, translateY };
}

/** Fade in only — no translation. */
export function useFadeIn(delay = 0) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 450,
      delay,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  return opacity;
}

/** Scale pop on mount — great for avatars, logos. */
export function usePopIn(delay = 0) {
  const scale = useRef(new Animated.Value(0.65)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        delay,
        friction: 6,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        delay,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return { scale, opacity };
}

/** Spring scale for press feedback on cards / buttons. */
export function useScalePress(pressedScale = 0.95) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.spring(scale, {
      toValue: pressedScale,
      useNativeDriver: true,
      friction: 8,
      tension: 200,
    }).start();

  const onPressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
      tension: 200,
    }).start();

  return { scale, onPressIn, onPressOut };
}

/** Spring scale that responds to an `active` boolean — used for tab icons. */
export function useActiveScale(active: boolean) {
  const scale = useRef(new Animated.Value(active ? 1.14 : 1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: active ? 1.14 : 1,
      useNativeDriver: true,
      friction: 5,
      tension: 180,
    }).start();
  }, [active]);

  return scale;
}
