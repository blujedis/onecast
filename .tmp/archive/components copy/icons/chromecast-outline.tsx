import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => {

  const { color, ...rest } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      {...rest}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        fill={color}
        d="M49.44 368.67V425h56.33c.01-31.17-25.15-56.33-56.33-56.33zm0-75.11v37.56c51.83 0 93.89 42.06 93.89 93.89h37.56c0-72.68-58.78-131.45-131.45-131.45zm0-75.12V256c93.33 0 169 75.67 169 169H256c0-114.17-92.57-206.56-206.56-206.56zM425 87H87c-20.66 0-37.56 16.9-37.56 37.56v56.33H87v-56.33h338v262.89H293.56V425H425c20.66 0 37.56-16.9 37.56-37.56V124.56C462.56 103.9 445.66 87 425 87z"
      />
    </Svg>
  );
};

export default SvgComponent
