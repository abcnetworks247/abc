
import { Tabs } from 'expo-router';

 function MyTabs() {
  return (
    <Tabs>
      <Tabs.Screen name="home"  />
      <Tabs.Screen name="profile"  />
    </Tabs>
  );
}