import React from 'react';
import Carousel from './components/blocks/Carousel/Carousel';
import { contentList } from './mock';
import './App.scss';

const App: React.FC = () => {
  if (!contentList || contentList.length === 0) {
    return <div>Нет данных для отображения</div>;
  }

  return (
    <div className="App">
      <Carousel content={contentList} />
    </div>
  );
};

export default App;
