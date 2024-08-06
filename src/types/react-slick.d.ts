// src/types/react-slick.d.ts

declare module 'react-slick' {
    import * as React from 'react';
  
    interface Settings {
      className?: string;
      adaptiveHeight?: boolean;
      arrows?: boolean;
      autoplay?: boolean;
      autoplaySpeed?: number;
      centerMode?: boolean;
      centerPadding?: string;
      cssEase?: string;
      dots?: boolean;
      dotsClass?: string;
      draggable?: boolean;
      easing?: string;
      fade?: boolean;
      focusOnSelect?: boolean;
      infinite?: boolean;
      initialSlide?: number;
      lazyLoad?: boolean;
      pauseOnHover?: boolean;
      responsive?: ResponsiveObject[];
      rtl?: boolean;
      slide?: string;
      slidesToShow?: number;
      slidesToScroll?: number;
      speed?: number;
      swipe?: boolean;
      swipeToSlide?: boolean;
      touchMove?: boolean;
      touchThreshold?: number;
      useCSS?: boolean;
      useTransform?: boolean;
      variableWidth?: boolean;
      vertical?: boolean;
      waitForAnimate?: boolean;
      afterChange?: (currentSlide: number) => void;
      beforeChange?: (currentSlide: number, nextSlide: number) => void;
      edgeFriction?: number;
      children?: React.ReactNode;
    }
  
    interface ResponsiveObject {
      breakpoint: number;
      settings: 'unslick' | Settings;
    }
  
    class Slider extends React.Component<Settings> {}
  
    export default Slider;
  }
  