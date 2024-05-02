import { COLORS } from "@/src/theme/colors";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  Animated,
  ViewStyle,
  StyleProp,
} from "react-native";

interface CustomModalProps {
  children: React.ReactNode;
  toggleBtn?: boolean;
  noBackDrop?: boolean;
  onCancel?: () => void;
  customStyle?: StyleProp<ViewStyle>;
}

const CustomModal = (props: CustomModalProps, ref: any) => {
  const {
    children,
    toggleBtn = false,
    onCancel,
    customStyle,
    noBackDrop,
  } = props;

  const [_visible, _setVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (ref) {
      ref.current = {
        setVisible: _setVisible,
      };
    }
  }, [ref]);

  useEffect(() => {
    if (_visible) {
      setVisible(true);
      Animated.timing(animValue, {
        duration: 300,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animValue, {
        duration: 300,
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
      });
    }
  }, [_visible, animValue]);

  const backdropAnimStyle = {
    opacity: animValue,
  };

  const promptAnimeStyle = {
    transform: [
      {
        translateY: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [500, 0],
        }),
      },
    ],
  };

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.content}>
        <Animated.View
          onTouchStart={onCancel}
          style={[styles.backdrop, StyleSheet.absoluteFill, backdropAnimStyle]}
        />

        <Animated.View
          style={[
            styles.prompt,
            promptAnimeStyle,
            {
              backgroundColor: COLORS.white,
            },
            customStyle,
          ]}
        >
          <View>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  prompt: {
    position: "absolute",
    bottom: 0,
    width: Dimensions.get("screen").width,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: COLORS.white,
    overflow: "hidden",
  },
});

export default forwardRef(CustomModal);
