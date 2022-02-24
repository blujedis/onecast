import withTheme from '../theme/withTheme';
import Container, { IContainerProps } from './elments/container';

export interface IPageComponentProps extends IContainerProps { }

const PageComponent = withTheme<IPageComponentProps>((props) => {

  props = {
    margin: props.theme?.page.margin,
    padding: props.theme?.page.padding,
    ...props
  };

  const { theme, children, ...rest } = props;

  return (
    <Container {...rest}>
      {children}
    </Container>
  );

});

export default PageComponent;