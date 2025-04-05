import ScreenContent  from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
 
import './global.css';


export default function App() {
  return (
    <>
      <ScreenContent/>
      <StatusBar style="auto" />
    </>
  );
}

const styles = {
  container: `flex-1 bg-yellow-50 justify-start pt-20`, // was bg-yellow-500
  separator: `h-[1px] my-7 w-4/5 bg-gray-500`,
  title: `text-xl font-bold`,
  cardStyle: `my-10 p-1`,
  fab: `absolute my-1 right-0 bottom-5 bg-green-500`,
};
