import common from './common';
import components from './components';
import schemes from './schemes';
import { expandProps } from '../../utils/object';

const theme = {
  ...common,
  ...components,
  schemes
};

const expanded = expandProps(theme);

export default expanded;