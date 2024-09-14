import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { useNavigation, StackActions } from '@react-navigation/native';
import useAppNavigation from '../hooks/useAppNavigation';


jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  StackActions: {
    replace: jest.fn(),
  },
}));

interface PropsComponent {
  route: string
  params?: {
    id: string | undefined
  }
}

// It is created because the useEffect requires a native calling component.
const TestComponent: React.FC<PropsComponent> = ({ route, params }) => {
  const { appNavigation } = useAppNavigation();
  // Simulate navigation
  appNavigation(route, params ?? params)
  
  return null;
};

describe('<useAppNavigation />', () => {
  let mockDispatch: jest.Mock;
  let route: string;

  beforeEach(() => {
    route = '';
    mockDispatch = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({
      dispatch: mockDispatch,
    });
  });

  afterEach(() => {
    jest.clearAllMocks
  })
  
  it('should navigate to Home when route is home', async () => {
    route = 'home';
    
    await act( async () => {
      renderer.create(<TestComponent route={route} />)
    });

    expect(StackActions.replace).toHaveBeenCalledWith('Home', undefined);
    expect(mockDispatch).toHaveBeenCalledWith(StackActions.replace('Home', undefined));
  });

  it('should navigate to Info when route is info', async () => {
    route = 'info';
    
    await act( async () => {
      renderer.create(<TestComponent route={route}  params={{id: '1'}}/>);
    });
    
    // Verify that StackActions.replace has been called with "Home"
    expect(StackActions.replace).toHaveBeenCalledWith('Info', {id: "1"});
    expect(mockDispatch).toHaveBeenCalledWith(StackActions.replace('Info', {id:'1'}));
  });

  it('should navigate to AddProduct when route is addProduct', async () => {
    const route = 'addProduct';
    
    await act( async () => {
      renderer.create(<TestComponent route={route} />);
    });
    
    expect(StackActions.replace).toHaveBeenCalledWith('AddProduct', undefined);
    expect(mockDispatch).toHaveBeenCalledWith(StackActions.replace('AddProduct', undefined));
  });

  it('should navigate to EditProduct when route is editProduct', async () => {
    const route = 'editProduct';

    await act( async () => {
      renderer.create(<TestComponent route={route} params={{id: '13'}} />);
    });
    
    expect(StackActions.replace).toHaveBeenCalledWith('EditProduct', {id: '13'});
    expect(mockDispatch).toHaveBeenCalledWith(StackActions.replace('EditProduct', {id: '13'}));
  });
});
