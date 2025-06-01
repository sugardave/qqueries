import {Warp, type WarpProps} from '@paper-design/shaders-react';

const WarpBackground = (props: WarpProps) => {
  const defaultProps = {
    speed: 0.4,
    rotation: 0.5,
    style: {width: '100%', height: '100%'}
  };

  return (
    <Warp
      {...defaultProps}
      {...props}
      style={{...defaultProps.style, ...props.style}}
    />
  );
};

export default WarpBackground;
export {WarpBackground};
