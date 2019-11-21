const MyDrawerNavigator = createDrawerNavigator({
    App: {
      screen: App,
    },
    Procura: {
      screen: Procura,
    },
  });
  
  const Drawer = createAppContainer(MyDrawerNavigator);