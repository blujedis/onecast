import withTheme from '../theme/lib/withTheme';
import Box, { IBoxComponentProps } from '../theme/elements/box';

export interface IPageComponentProps extends IBoxComponentProps { }

const PageComponent = withTheme<IPageComponentProps>((props) => {

  props = {
    flex: 1,
    justifyContent: 'flex-start',
    ...props
  };

  const { theme, children, ...rest } = props;

  const pageStyles = theme?.page;

  const boxStyles = {
    ...pageStyles,
    ...rest
  };

  return (
    <Box {...boxStyles}>
      {children}
    </Box>
  );

});

export default PageComponent;