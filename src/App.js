import React, { useState, useEffect, useCallback } from 'react';
import { Target, Swords, Shield, Flame, Settings, Sparkles, Brain, Bolt, Users, User, Zap, Trophy } from 'lucide-react';

const Calc3PvPGame = () => {
  const [gameState, setGameState] = useState('menu');
  const [playerHP, setPlayerHP] = useState(100);
  const [maxPlayerHP, setMaxPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [maxEnemyHP, setMaxEnemyHP] = useState(100);
  const [playerScore, setPlayerScore] = useState(0);
  const [round, setRound] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [playerAnimation, setPlayerAnimation] = useState('');
  const [enemyAnimation, setEnemyAnimation] = useState('');
  const [battleLog, setBattleLog] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [enemyThinking, setEnemyThinking] = useState(false);
  const [maxTime, setMaxTime] = useState(15);
  const [showSettings, setShowSettings] = useState(false);
  const [playerClass, setPlayerClass] = useState(null);
  const [showClassSelect, setShowClassSelect] = useState(false);
  const [energy, setEnergy] = useState(3);
  const [maxEnergy] = useState(3);
  const [abilityOnCooldown, setAbilityOnCooldown] = useState(false);
  const [currentTurn, setCurrentTurn] = useState('player');
  const [shield, setShield] = useState(0);
  const [enemyNextMove, setEnemyNextMove] = useState(null);
  const [questionStreak, setQuestionStreak] = useState(0);

  const classes = {
    warrior: {
      name: 'Warrior',
      icon: Swords,
      color: 'from-red-500 to-orange-600',
      description: 'High damage, defensive expert',
      bonusDamage: 10,
      damageReduction: 0.75,
      ability: {
        name: 'Shield Wall',
        description: 'Gain 30 shield points',
        cost: 2
      }
    },
    mage: {
      name: 'Mage',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-600',
      description: 'Time and energy master',
      bonusDamage: 5,
      damageReduction: 1.0,
      ability: {
        name: 'Arcane Surge',
        description: 'Deal 35 damage',
        cost: 2
      }
    },
    rogue: {
      name: 'Rogue',
      icon: Zap,
      color: 'from-green-500 to-teal-600',
      description: 'Speed and combo specialist',
      bonusDamage: 15,
      damageReduction: 1.0,
      ability: {
        name: 'Perfect Strike',
        description: 'Guarantee next answer',
        cost: 3
      }
    },
    scholar: {
      name: 'Scholar',
      icon: Brain,
      color: 'from-blue-500 to-cyan-600',
      description: 'Balanced sustain build',
      bonusDamage: 8,
      damageReduction: 0.85,
      ability: {
        name: 'Focus',
        description: 'Heal 35 HP',
        cost: 2
      }
    }
  };

  const generateQuestion = useCallback(() => {
    const topics = ['functions', 'limits', 'partials'];
    const topic = topics[Math.floor(Math.random() * topics.length)];
    
    const questions = {
      functions: [
        { q: 'f(x,y) = x² + y². Find f(2,3)', a: 13, opts: [13, 11, 15, 9] },
        { q: 'f(x,y) = xy + 2x. Find f(3,4)', a: 18, opts: [18, 14, 20, 16] },
        { q: 'f(x,y) = 3x - 2y. Find f(4,5)', a: 2, opts: [2, 12, -2, 22] },
        { q: 'f(x,y) = x²y. Find f(2,3)', a: 12, opts: [12, 18, 8, 24] }
      ],
      limits: [
        { q: 'lim(x,y)→(0,0) of x² + y²', a: 0, opts: [0, 1, -1, 2] },
        { q: 'lim(x,y)→(1,2) of 3x + 2y', a: 7, opts: [7, 5, 8, 6] },
        { q: 'lim(x,y)→(2,3) of xy', a: 6, opts: [6, 5, 8, 7] },
        { q: 'lim(x,y)→(0,0) of 5', a: 5, opts: [5, 0, 1, 10] }
      ],
      partials: [
        { q: 'f(x,y) = x² + y². Find ∂f/∂x at (2,3)', a: 4, opts: [4, 6, 2, 8] },
        { q: 'f(x,y) = 3xy. Find ∂f/∂x at (2,1)', a: 3, opts: [3, 6, 2, 9] },
        { q: 'f(x,y) = x³ + y. Find ∂f/∂x at (2,5)', a: 12, opts: [12, 8, 6, 24] },
        { q: 'f(x,y) = 2x + 5y. Find ∂f/∂x', a: 2, opts: [2, 5, 7, 0] }
      ]
    };
    
    const pool = questions[topic];
    const q = pool[Math.floor(Math.random() * pool.length)];
    return { ...q, topic, options: [...q.opts].sort(() => Math.random() - 0.5) };
  }, []);

  const calculateEnemyMove = useCallback(() => {
    const baseAcc = 0.50 + (round * 0.03);
    const penalty = Math.min(questionStreak * 0.05, 0.15);
    const finalAcc = Math.max(0.50, Math.min(0.85, baseAcc - penalty));
    const willSucceed = Math.random() < finalAcc;
    // Always show a damage value even if they'll miss (for bluffing)
    const displayDamage = 18 + Math.floor(Math.random() * 8);
    return { 
      willSucceed, 
      damage: willSucceed ? displayDamage : 0,
      displayDamage, // What the player sees
      accuracy: Math.round(finalAcc * 100)
    };
  }, [round, questionStreak]);

  const newQuestion = useCallback(() => {
    setCurrentQuestion(generateQuestion());
    setTimeLeft(maxTime);
    setSelectedAnswer(null);
    setFeedback('');
    setCurrentTurn('player');
    setEnemyNextMove(calculateEnemyMove());
  }, [generateQuestion, maxTime, calculateEnemyMove]);

  useEffect(() => {
    if (gameState === 'playing' && playerClass) {
      newQuestion();
    }
  }, [gameState, playerClass]);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && !selectedAnswer && currentTurn === 'player') {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing' && !selectedAnswer && currentTurn === 'player') {
      handleTimeout();
    }
  }, [gameState, timeLeft, selectedAnswer, currentTurn]);

  const addLog = (msg) => {
    setBattleLog([{ msg, id: Date.now() }]);
  };

  const applyDamage = (dmg, toPlayer) => {
    if (toPlayer) {
      const actual = Math.floor(dmg * classes[playerClass].damageReduction);
      const shieldDmg = Math.min(shield, actual);
      const hpDmg = actual - shieldDmg;
      if (shieldDmg > 0) setShield(s => s - shieldDmg);
      const newHP = Math.max(0, playerHP - hpDmg);
      setPlayerHP(newHP);
      return { newHP, actualDamage: hpDmg };
    }
    const newHP = Math.max(0, enemyHP - dmg);
    setEnemyHP(newHP);
    return { newHP, actualDamage: dmg };
  };

  const handleTimeout = () => {
    const result = applyDamage(15, true);
    addLog(`Time up! ${result.actualDamage} damage!`);
    setPlayerAnimation('shake');
    setTimeout(() => {
      setPlayerAnimation('');
      if (result.newHP <= 0) {
        setGameState('defeat');
      } else {
        enemyAttack();
      }
    }, 1000);
  };

  const enemyAttack = () => {
    setCurrentTurn('enemy');
    setEnemyThinking(true);
    setTimeout(() => {
      setEnemyThinking(false);
      if (enemyNextMove.willSucceed) {
        const result = applyDamage(enemyNextMove.damage, true);
        addLog(`Enemy: ${result.actualDamage} damage!`);
        setEnemyAnimation('attack');
        setPlayerAnimation('shake');
        setTimeout(() => {
          setPlayerAnimation('');
          setEnemyAnimation('');
          if (result.newHP <= 0) {
            setGameState('defeat');
          } else {
            setQuestionStreak(0);
            newQuestion();
          }
        }, 1000);
      } else {
        const result = applyDamage(8, false);
        addLog('Enemy missed!');
        setEnemyAnimation('shake');
        setTimeout(() => {
          setEnemyAnimation('');
          if (result.newHP <= 0) {
            nextRound();
          } else {
            setQuestionStreak(0);
            newQuestion();
          }
        }, 1000);
      }
    }, 2000);
  };

  const useAbility = () => {
    if (energy < classes[playerClass].ability.cost || abilityOnCooldown || selectedAnswer || currentTurn !== 'player') return;
    
    setEnergy(e => e - classes[playerClass].ability.cost);
    setAbilityOnCooldown(true);
    
    if (playerClass === 'warrior') {
      setShield(s => s + 30);
      addLog('Shield +30!');
      setPlayerAnimation('heal');
    } else if (playerClass === 'mage') {
      const result = applyDamage(35, false);
      setEnergy(e => Math.min(3, e + 1));
      addLog('Arcane Surge! 35 damage!');
      setPlayerAnimation('attack');
      setEnemyAnimation('shake');
      if (result.newHP <= 0) {
        setTimeout(() => nextRound(), 1000);
        return;
      }
    } else if (playerClass === 'rogue') {
      setCurrentQuestion(prev => ({ ...prev, perfectStrike: true }));
      addLog('Perfect Strike active!');
      setPlayerAnimation('heal');
    } else if (playerClass === 'scholar') {
      setPlayerHP(hp => Math.min(maxPlayerHP, hp + 35));
      setTimeLeft(t => t + 5);
      addLog('Healed 35 HP!');
      setPlayerAnimation('heal');
    }
    
    setTimeout(() => {
      setPlayerAnimation('');
      setEnemyAnimation('');
      setAbilityOnCooldown(false);
    }, 1000);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.a || currentQuestion.perfectStrike;
    
    if (isCorrect) {
      const baseDmg = 25 + classes[playerClass].bonusDamage;
      const totalDmg = baseDmg + (combo * 5);
      const result = applyDamage(totalDmg, false);
      setPlayerScore(s => s + 100 + (combo * 20));
      setCombo(c => {
        setMaxCombo(mc => Math.max(mc, c + 1));
        return c + 1;
      });
      setEnergy(e => Math.min(maxEnergy, e + 1));
      setQuestionStreak(qs => qs + 1);
      setFeedback(`✓ ${totalDmg} damage!`);
      addLog(`You deal ${totalDmg} damage!`);
      setPlayerAnimation('attack');
      setEnemyAnimation('shake');
      
      setTimeout(() => {
        setPlayerAnimation('');
        setEnemyAnimation('');
        if (result.newHP <= 0) {
          nextRound();
        } else {
          enemyAttack();
        }
      }, 1200);
    } else {
      const result = applyDamage(20, true);
      setCombo(0);
      setQuestionStreak(0);
      setFeedback(`✗ Wrong! Answer: ${currentQuestion.a}`);
      addLog(`You take ${result.actualDamage} damage!`);
      setPlayerAnimation('shake');
      
      setTimeout(() => {
        setPlayerAnimation('');
        if (result.newHP <= 0) {
          setGameState('defeat');
        } else {
          newQuestion();
        }
      }, 1500);
    }
  };

  const nextRound = () => {
    addLog('Victory!');
    setRound(r => r + 1);
    setTimeout(() => {
      const newMaxEnemy = 100 + (round * 20);
      setMaxEnemyHP(newMaxEnemy);
      setEnemyHP(newMaxEnemy);
      const newMaxPlayer = maxPlayerHP + 25;
      setMaxPlayerHP(newMaxPlayer);
      setPlayerHP(Math.min(newMaxPlayer, playerHP + 50));
      setEnergy(maxEnergy);
      setShield(0);
      setQuestionStreak(0);
      setBattleLog([]);
      newQuestion();
    }, 2000);
  };

  const startGame = () => {
    if (!playerClass) {
      setShowClassSelect(true);
      return;
    }
    setGameState('playing');
    setPlayerHP(100);
    setMaxPlayerHP(100);
    setEnemyHP(100);
    setMaxEnemyHP(100);
    setPlayerScore(0);
    setRound(1);
    setCombo(0);
    setMaxCombo(0);
    setEnergy(3);
    setShield(0);
    setQuestionStreak(0);
  };

  const selectClass = (cls) => {
    setPlayerClass(cls);
    setShowClassSelect(false);
    setGameState('playing');
    setPlayerHP(100);
    setMaxPlayerHP(100);
    setEnemyHP(100);
    setMaxEnemyHP(100);
    setPlayerScore(0);
    setRound(1);
    setCombo(0);
    setMaxCombo(0);
    setEnergy(3);
    setShield(0);
    setQuestionStreak(0);
  };

  if (showClassSelect) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center max-w-6xl">
          <Users className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-white mb-8">Choose Your Class</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(classes).map(([key, cls]) => {
              const Icon = cls.icon;
              return (
                <button
                  key={key}
                  onClick={() => selectClass(key)}
                  className={`bg-gradient-to-br ${cls.color} p-6 rounded-lg hover:scale-105 transition-all`}
                >
                  <Icon className="w-16 h-16 text-white mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-white mb-2">{cls.name}</h3>
                  <p className="text-sm text-white mb-3">{cls.description}</p>
                  <div className="bg-black/30 rounded p-2 mb-2">
                    <p className="text-xs text-yellow-300 font-bold">{cls.ability.name}</p>
                    <p className="text-xs text-white">{cls.ability.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'menu') {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <Swords className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-white mb-2">Calculus Arena</h1>
          <h2 className="text-3xl font-bold text-purple-300 mb-8">Battle of the Derivatives</h2>
          {!showSettings ? (
            <>
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 mb-8 max-w-2xl">
                <p className="text-xl text-white mb-4">Strategic turn-based math combat!</p>
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={startGame}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold text-2xl px-12 py-4 rounded-full hover:scale-105 transition-all"
                >
                  {playerClass ? 'ENTER ARENA' : 'SELECT CLASS'}
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="bg-white/20 text-white font-bold text-2xl px-8 py-4 rounded-full hover:scale-105 transition-all"
                >
                  <Settings size={28} />
                </button>
              </div>
            </>
          ) : (
            <div className="bg-white/10 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-white mb-6">Settings</h3>
              <div className="mb-6">
                <label className="text-white text-lg mb-2 block">Time Per Question</label>
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={maxTime}
                  onChange={(e) => setMaxTime(parseInt(e.target.value))}
                  className="w-full"
                />
                <p className="text-yellow-400 text-xl font-bold mt-2">{maxTime} seconds</p>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="bg-purple-500 text-white font-bold text-xl px-8 py-3 rounded-full w-full"
              >
                BACK
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (gameState === 'defeat') {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-red-900 via-gray-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <Swords className="w-24 h-24 text-red-400 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-red-400 mb-4">DEFEATED</h1>
          <div className="bg-white/10 rounded-lg p-8 mb-8">
            <p className="text-3xl text-white mb-2">Round: {round}</p>
            <p className="text-2xl text-purple-300 mb-2">Score: {playerScore}</p>
            <p className="text-xl text-yellow-400">Max Combo: x{maxCombo}</p>
          </div>
          <button
            onClick={() => {
              setPlayerClass(null);
              setGameState('menu');
            }}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold text-xl px-8 py-3 rounded-full hover:scale-105 transition-all"
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    );
  }

  if (!playerClass || !currentQuestion) return null;

  const cls = classes[playerClass];
  const Icon = cls.icon;

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Exit Button */}
      <button
        onClick={() => {
          setPlayerClass(null);
          setGameState('menu');
        }}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg transition-all"
      >
        Exit to Menu
      </button>

      <div className={`mb-4 py-4 px-8 rounded-xl text-center ${currentTurn === 'player' ? 'bg-green-500' : 'bg-red-500'}`}>
        <h2 className="text-3xl font-bold text-white">{currentTurn === 'player' ? 'YOUR TURN' : 'ENEMY TURN'}</h2>
      </div>

      <div className="text-center mb-3">
        <h2 className="text-2xl font-bold text-yellow-400">ROUND {round}</h2>
        <div className="flex justify-center gap-4 mt-2">
          <span className="text-purple-300 font-bold">Score: {playerScore}</span>
          {combo > 0 && (
            <span className="text-yellow-400 font-bold flex items-center gap-1">
              <Flame size={20} /> x{combo}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 max-w-6xl mx-auto">
        <div className="text-center">
          <div className={`w-32 h-32 bg-gradient-to-br ${cls.color} rounded-full flex items-center justify-center mb-2 ${currentTurn === 'player' ? 'ring-4 ring-green-400' : ''} ${playerAnimation}`}>
            <Icon className="w-16 h-16 text-white" />
          </div>
          <div className="bg-green-600 h-4 rounded-full w-32 mb-1">
            <div className="bg-green-400 h-full" style={{ width: `${(playerHP / maxPlayerHP) * 100}%` }} />
          </div>
          <p className="text-white font-bold">YOU: {playerHP}/{maxPlayerHP}</p>
          {shield > 0 && <p className="text-blue-400 text-sm">🛡️ {shield}</p>}
          <div className="flex gap-1 justify-center mt-2">
            {[...Array(maxEnergy)].map((_, i) => (
              <div key={i} className={`w-6 h-6 rounded ${i < energy ? 'bg-blue-400' : 'bg-gray-600'}`} />
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={useAbility}
            disabled={energy < cls.ability.cost || abilityOnCooldown || selectedAnswer || currentTurn !== 'player'}
            className={`px-6 py-3 rounded-lg font-bold ${energy >= cls.ability.cost && !abilityOnCooldown && !selectedAnswer && currentTurn === 'player' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-600 text-gray-400'}`}
          >
            <div className="text-sm">{cls.ability.name}</div>
            <div className="text-xs">⚡ {cls.ability.cost}</div>
          </button>
        </div>

        <div className="text-center">
          <div className={`w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-2 ${currentTurn === 'enemy' ? 'ring-4 ring-red-400' : ''} ${enemyAnimation}`}>
            <Target className="w-16 h-16 text-white" />
          </div>
          <div className="bg-red-600 h-4 rounded-full w-32 mb-1">
            <div className="bg-red-400 h-full" style={{ width: `${(enemyHP / maxEnemyHP) * 100}%` }} />
          </div>
          <p className="text-white font-bold">ENEMY: {enemyHP}/{maxEnemyHP}</p>
          {enemyThinking && <p className="text-yellow-300 text-sm">Thinking...</p>}
          {enemyNextMove && currentTurn === 'player' && (
            <div className="mt-2 bg-black/50 rounded px-3 py-1">
              <p className="text-xs text-gray-300">Next Move:</p>
              <p className="text-red-400 font-bold text-sm">⚔️ {enemyNextMove.displayDamage} dmg</p>
              <p className="text-xs text-gray-400">{enemyNextMove.accuracy}% acc</p>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto mb-3 min-h-12">
        {battleLog.map((log) => (
          <p key={log.id} className="text-center font-bold text-white">{log.msg}</p>
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 rounded-lg p-5 mb-3">
          <div className="flex justify-between mb-3">
            <span className="px-4 py-1 bg-blue-500 rounded-full text-white text-sm font-bold">{currentQuestion.topic}</span>
            <span className={`text-2xl font-bold ${timeLeft <= 5 ? 'text-red-400' : 'text-white'}`}>⏱️ {timeLeft}s</span>
          </div>
          <h2 className="text-2xl font-bold text-white text-center">{currentQuestion.q}</h2>
          {currentQuestion.perfectStrike && <p className="text-center text-green-400 font-bold mt-2">⚡ PERFECT STRIKE ⚡</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {currentQuestion.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              disabled={selectedAnswer || enemyThinking || currentTurn !== 'player'}
              className={`p-4 rounded-lg font-bold text-xl transition-all ${
                !selectedAnswer && currentTurn === 'player'
                  ? 'bg-white/20 hover:bg-white/30 text-white'
                  : selectedAnswer === opt
                  ? (opt === currentQuestion.a || currentQuestion.perfectStrike ? 'bg-green-500' : 'bg-red-500') + ' text-white'
                  : opt === currentQuestion.a && selectedAnswer ? 'bg-green-500 text-white'
                  : 'bg-white/10 text-white/50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {feedback && (
          <div className={`mt-3 text-center text-xl font-bold ${feedback.includes('✓') ? 'text-green-300' : 'text-red-300'}`}>
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calc3PvPGame;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
