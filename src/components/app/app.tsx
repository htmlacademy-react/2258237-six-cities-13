import MainPage from '../../pages/main/main';

type AppScreenProps = {
  userLogin: string;
  favoriteHotelsCount: number;
  currentOffersInCity: number;
  currentCityName: string;
}

function App({userLogin, favoriteHotelsCount, currentOffersInCity, currentCityName}: AppScreenProps): JSX.Element {
  return (
    <MainPage userLogin={userLogin} favoriteHotelsCount={favoriteHotelsCount} currentOffersInCity={currentOffersInCity} currentCityName={currentCityName} />
  );
}

export default App;
