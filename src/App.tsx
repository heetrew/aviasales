import React, { useState, useEffect } from 'react';
import './App.css';
import { DATA } from './data';
import { Question } from './types';
import Loader from './components/Loader';
import Background from './components/Background';
import Card from './components/Card';
import Controls from './components/Controls';
import Overlay from './components/Overlay';
import Trail from './components/Trail';
import { shuffle } from './utils/shuffle';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showFinish, setShowFinish] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<boolean | null>(null);
  const [loadingText, setLoadingText] = useState('');
  const [randomAd, setRandomAd] = useState('');
  const [correctCount, setCorrectCount] = useState(0);

  const threshold = window.innerWidth * 0.25;

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      setLoadingText(DATA.loading[Math.floor(Math.random() * DATA.loading.length)]);
      
      const shuffledQuestions = shuffle(DATA.questions);
      setQuestions(shuffledQuestions);

      const preload = (urls: string[]) => {
        return Promise.all(urls.map(url => new Promise(resolve => {
          const img = new Image();
          img.src = url;
          img.onload = img.onerror = resolve;
        })));
      };

      try {
        await preload(shuffledQuestions.map(q => q.bg));
      } catch (e) {
        console.warn("Some images failed to load", e);
      }

      setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    init();
  }, []);

  const handleChoice = (userAnswer: boolean) => {
    const currentQ = questions[currentIndex];
    if (currentQ && userAnswer === currentQ.answer) {
      setCorrectCount(prev => prev + 1);
    }
    setLastAnswer(userAnswer);
    setRandomAd(DATA.ads[Math.floor(Math.random() * DATA.ads.length)]);
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    if (currentIndex + 1 >= questions.length) {
      setShowFinish(true);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setShowFinish(false);
    setCurrentIndex(0);
    setCorrectCount(0);
    setQuestions(shuffle(DATA.questions));
  };

  const currentQuestion = questions[currentIndex];
  const isCorrect = lastAnswer === (currentQuestion?.answer ?? null);

  return (
    <>
      <Background 
        currentBg={currentQuestion?.bg} 
        currentIndex={currentIndex} 
      />
      <Trail />
      
      <main className="app-container">
        <header className="header">
          <h1>Правда или Ложь?</h1>
          <p id="progress-text">
            {questions.length > 0 ? `Вопрос ${currentIndex + 1} из ${questions.length}` : '...'}
          </p>
        </header>

        <section className="card-area">
          {!loading && !showFinish && currentQuestion && (
            <Card 
              key={currentIndex}
              index={currentIndex}
              text={currentQuestion.text}
              onSwipe={(dir) => handleChoice(dir === 'right')}
              threshold={threshold}
              styles={currentQuestion.styles}
              icon={currentQuestion.icon}
            />
          )}
        </section>

        <p className="mechanics-hint">Свайп влево - Нет, вправо - Да</p>
        <p className="mechanics-hint">Или жми на кнопки</p>

        <Controls 
          onChoice={handleChoice} 
          disabled={showResult || showFinish || loading} 
        />

        <Overlay 
          active={showResult}
          title={isCorrect ? 'Верно!' : 'Ой, ошибка!'}
          titleClassName={isCorrect ? 'correct' : 'incorrect'}
          description={currentQuestion?.explanation || ''}
          adText={randomAd}
          btnText="Понятно"
          onConfirm={handleNext}
        />

        <Overlay 
          active={showFinish}
          title="Отлично!"
          titleClassName="correct"
          description={`Вы прошли все вопросы. Правильных ответов: ${correctCount} из ${questions.length}.`}
          adText="Хватит играть! Пора планировать путешествие. Ищите самые дешевые билеты на Авиасейлс!"
          btnText="Начать заново"
          onConfirm={handleRestart}
        />
      </main>

      <Loader text={loadingText} hidden={!loading} />
    </>
  );
};

export default App;
