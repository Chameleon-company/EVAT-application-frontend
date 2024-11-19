import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  GestureResponderEvent,
  Image,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {BlurView} from '@react-native-community/blur';

const {width: w} = Dimensions.get('window');

const HeaderMenu = props => {
  const {menuData, active, onPress, translateY, menuItemWidth, menuHeight} =
    props;
  const insets = useSafeAreaInsets();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const handlePress = (event, id) => {
    onPress(id);
  };

  const onGestureEvent = event => {};

  return (
    <Animated.View
      style={[
        styles.header,
        animatedStyle,
        {
          height: menuHeight,
        },
      ]}>
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={2}
        reducedTransparencyFallbackColor="rgba(255, 255, 255, 0.2)"></BlurView>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.btnWrapper}>
          {menuData.map((btn, index) => (
            <Pressable onPress={e => handlePress(e, btn.id)} key={index}>
              <View
                style={[
                  {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <View
                  style={[
                    styles.innerContainer,
                    {
                      borderColor: active === btn.id ? '#008000' : '#007AFF',
                      width: menuItemWidth,
                      height: menuItemWidth,
                      borderRadius: menuItemWidth / 2,
                    },
                  ]}>
                  {btn.icon(active === btn.id ? '#008000' : '#007AFF')}
                </View>
                <Text
                  style={[
                    {
                      color: active === btn.id ? '#008000' : '#007AFF',
                      marginTop: 12,
                    },
                  ]}>
                  {btn.name}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </SafeAreaView>
      {/* Line */}
      <View style={styles.lineWrapper}>
        <View style={styles.line} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    zIndex: 999,
    borderBottomColor: '#ddd',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  absolute: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    position: 'relative',
    zIndex: 2,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  innerContainer: {
    borderColor: '#007AFF',
    borderStyle: 'solid',
    borderWidth: 1,
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#007AFF',
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
  btnWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  lineWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  line: {
    width: w / 3,
    height: 5,
    backgroundColor: '#C5C1C1',
    borderRadius: 5,
  },
});

export default HeaderMenu;
