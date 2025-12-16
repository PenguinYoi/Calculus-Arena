import React, { useState, useEffect, useCallback } from 'react';
import { Target, Swords, Shield, Flame, Settings, Sparkles, Brain, Bolt, Users, User, Zap, Trophy } from 'lucide-react';

const Calc3PvPGame = () => {
  // All state declarations at the top
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
  const [abilityOnCooldown, setAbilityOnCooldown] = useState(false);
  const [currentTurn, setCurrentTurn] = useState('player');
  const [shield, setShield] = useState(0);
  const [enemyNextMove, setEnemyNextMove] = useState(null);
  const [questionStreak, setQuestionStreak] = useState(0);
  const [enemyClass, setEnemyClass] = useState(null);

  const maxEnergy = 3;

  const classes = {
    warrior: {
      name: 'Warrior',
      icon: Swords,
      color: 'from-red-500 to-orange-600',
      description: 'High damage, defensive expert',
      bonusDamage: 10,
      damageReduction: 0.75,
      ability: { name: 'Shield Wall', description: 'Gain 30 shield points', cost: 2 }
    },
    mage: {
      name: 'Mage',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-600',
      description: 'Time and energy master',
      bonusDamage: 5,
      damageReduction: 1.0,
      ability: { name: 'Arcane Surge', description: 'Deal 35 damage and gain 1 cost', cost: 2 }
    },
    rogue: {
      name: 'Rogue',
      icon: Zap,
      color: 'from-green-500 to-teal-600',
      description: 'Speed and combo specialist',
      bonusDamage: 15,
      damageReduction: 1.0,
      ability: { name: 'Perfect Strike', description: 'Guarantee next answer', cost: 3 }
    },
    scholar: {
      name: 'Scholar',
      icon: Brain,
      color: 'from-blue-500 to-cyan-600',
      description: 'Balanced sustain build',
      bonusDamage: 8,
      damageReduction: 0.85,
      ability: { name: 'Focus', description: 'Heal 35 HP', cost: 2 }
    }
  };

  const generateQuestion = () => {
    const topics = ['functions', 'limits', 'partials'];
    const topic = topics[Math.floor(Math.random() * topics.length)];
    
    const questions = {
  "functions": [
    {
      "q": "f(x,y) = 2xy + 1x + 1y. Find f(5,-4)",
      "a": -39,
      "opts": [
        -37,
        -40,
        -39,
        -42
      ]
    },
    {
      "q": "f(x,y) = 3x + 3y. Find f(0,-3)",
      "a": -9,
      "opts": [
        -6,
        -9,
        -10,
        -11
      ]
    },
    {
      "q": "f(x,y) = 4x^2 + 4y^2. Find f(4,3)",
      "a": 100,
      "opts": [
        102,
        103,
        100,
        101
      ]
    },
    {
      "q": "f(x,y) = 4xy + 5x + 0y. Find f(0,0)",
      "a": 0,
      "opts": [
        3,
        2,
        0,
        -1
      ]
    },
    {
      "q": "f(x,y) = 4x^2 + 3y^2. Find f(2,2)",
      "a": 28,
      "opts": [
        26,
        25,
        30,
        28
      ]
    },
    {
      "q": "f(x,y) = 5x^3 + 2y^2 + 5. Find f(-5,-3)",
      "a": -602,
      "opts": [
        -602,
        -603,
        -599,
        -600
      ]
    },
    {
      "q": "f(x,y) = 5x^2 + 4y^2. Find f(-2,2)",
      "a": 36,
      "opts": [
        36,
        35,
        39,
        37
      ]
    },
    {
      "q": "f(x,y) = 2xy + 2x + 0y. Find f(2,4)",
      "a": 20,
      "opts": [
        18,
        20,
        22,
        19
      ]
    },
    {
      "q": "f(x,y) = 4x + 4y. Find f(-1,-2)",
      "a": -12,
      "opts": [
        -9,
        -11,
        -15,
        -12
      ]
    },
    {
      "q": "f(x,y) = 1x + 1y. Find f(-3,-5)",
      "a": -8,
      "opts": [
        -8,
        -10,
        -5,
        -6
      ]
    },
    {
      "q": "f(x,y) = 5x^3 + 4y^2 + 5. Find f(-4,1)",
      "a": -311,
      "opts": [
        -310,
        -308,
        -311,
        -309
      ]
    },
    {
      "q": "f(x,y) = 2xy + 5x + 3y. Find f(-3,0)",
      "a": -15,
      "opts": [
        -15,
        -18,
        -13,
        -16
      ]
    },
    {
      "q": "f(x,y) = 4x^3 + 4y^2 + 1. Find f(3,0)",
      "a": 109,
      "opts": [
        109,
        107,
        106,
        111
      ]
    },
    {
      "q": "f(x,y) = 3xy + 5x + 2y. Find f(-4,1)",
      "a": -30,
      "opts": [
        -32,
        -30,
        -28,
        -33
      ]
    },
    {
      "q": "f(x,y) = 1x^3 + 3y^2 + 5. Find f(-5,5)",
      "a": -45,
      "opts": [
        -46,
        -42,
        -48,
        -45
      ]
    },
    {
      "q": "f(x,y) = 2x + 5y. Find f(-1,3)",
      "a": 13,
      "opts": [
        10,
        16,
        13,
        15
      ]
    },
    {
      "q": "f(x,y) = 5xy + 3x + 1y. Find f(2,5)",
      "a": 61,
      "opts": [
        61,
        60,
        64,
        58
      ]
    },
    {
      "q": "f(x,y) = 4x^3 + 5y^2 + 5. Find f(-5,0)",
      "a": -495,
      "opts": [
        -495,
        -492,
        -497,
        -493
      ]
    },
    {
      "q": "f(x,y) = 5x + 1y. Find f(3,-3)",
      "a": 12,
      "opts": [
        10,
        15,
        12,
        13
      ]
    },
    {
      "q": "f(x,y) = 1xy + 1x + 4y. Find f(-4,-2)",
      "a": -4,
      "opts": [
        -3,
        -4,
        -7,
        -1
      ]
    },
    {
      "q": "f(x,y) = 1x + 5y. Find f(0,-1)",
      "a": -5,
      "opts": [
        -5,
        -6,
        -3,
        -4
      ]
    },
    {
      "q": "f(x,y) = 1xy + 4x + 0y. Find f(5,-4)",
      "a": 0,
      "opts": [
        2,
        0,
        -2,
        3
      ]
    },
    {
      "q": "f(x,y) = 5xy + 3x + 1y. Find f(0,5)",
      "a": 5,
      "opts": [
        8,
        7,
        5,
        6
      ]
    },
    {
      "q": "f(x,y) = 2x^2 + 1y^2. Find f(-1,-4)",
      "a": 18,
      "opts": [
        15,
        16,
        17,
        18
      ]
    },
    {
      "q": "f(x,y) = 5xy + 5x + 0y. Find f(-1,-4)",
      "a": 15,
      "opts": [
        16,
        17,
        14,
        15
      ]
    },
    {
      "q": "f(x,y) = 1x + 3y. Find f(-2,1)",
      "a": 1,
      "opts": [
        2,
        3,
        -2,
        1
      ]
    },
    {
      "q": "f(x,y) = 1x + 2y. Find f(-3,3)",
      "a": 3,
      "opts": [
        0,
        3,
        5,
        2
      ]
    },
    {
      "q": "f(x,y) = 1xy + 2x + 4y. Find f(-3,5)",
      "a": -1,
      "opts": [
        -1,
        0,
        -3,
        2
      ]
    },
    {
      "q": "f(x,y) = 4x + 4y. Find f(3,5)",
      "a": 32,
      "opts": [
        34,
        33,
        32,
        29
      ]
    },
    {
      "q": "f(x,y) = 2x^3 + 1y^2 + 5. Find f(0,-3)",
      "a": 14,
      "opts": [
        16,
        15,
        14,
        11
      ]
    },
    {
      "q": "f(x,y) = 5xy + 2x + 3y. Find f(1,-2)",
      "a": -14,
      "opts": [
        -16,
        -12,
        -14,
        -13
      ]
    },
    {
      "q": "f(x,y) = 5x^3 + 1y^2 + 1. Find f(1,-2)",
      "a": 10,
      "opts": [
        13,
        9,
        10,
        8
      ]
    },
    {
      "q": "f(x,y) = 4x^3 + 4y^2 + 2. Find f(-1,0)",
      "a": -2,
      "opts": [
        -2,
        -4,
        -5,
        -1
      ]
    },
    {
      "q": "f(x,y) = 4xy + 4x + 5y. Find f(4,0)",
      "a": 16,
      "opts": [
        13,
        16,
        17,
        19
      ]
    },
    {
      "q": "f(x,y) = 5xy + 5x + 3y. Find f(-4,2)",
      "a": -54,
      "opts": [
        -54,
        -53,
        -55,
        -51
      ]
    },
    {
      "q": "f(x,y) = 5x^3 + 5y^2 + 3. Find f(-5,5)",
      "a": -497,
      "opts": [
        -497,
        -500,
        -498,
        -496
      ]
    },
    {
      "q": "f(x,y) = 4xy + 3x + 1y. Find f(-2,3)",
      "a": -27,
      "opts": [
        -25,
        -27,
        -28,
        -26
      ]
    },
    {
      "q": "f(x,y) = 1x^2 + 1y^2. Find f(-1,-1)",
      "a": 2,
      "opts": [
        2,
        1,
        5,
        0
      ]
    },
    {
      "q": "f(x,y) = 3xy + 2x + 2y. Find f(-3,-5)",
      "a": 29,
      "opts": [
        29,
        31,
        30,
        26
      ]
    },
    {
      "q": "f(x,y) = 1x^2 + 5y^2. Find f(5,-3)",
      "a": 70,
      "opts": [
        69,
        68,
        73,
        70
      ]
    },
    {
      "q": "f(x,y) = 3x^2 + 5y^2. Find f(0,-1)",
      "a": 5,
      "opts": [
        6,
        2,
        7,
        5
      ]
    },
    {
      "q": "f(x,y) = 3x + 1y. Find f(1,-5)",
      "a": -2,
      "opts": [
        0,
        -3,
        -2,
        1
      ]
    },
    {
      "q": "f(x,y) = 5x^3 + 2y^2 + 5. Find f(4,3)",
      "a": 343,
      "opts": [
        340,
        346,
        345,
        343
      ]
    },
    {
      "q": "f(x,y) = 1x + 5y. Find f(0,-3)",
      "a": -15,
      "opts": [
        -13,
        -16,
        -17,
        -15
      ]
    },
    {
      "q": "f(x,y) = 2xy + 4x + 2y. Find f(1,5)",
      "a": 24,
      "opts": [
        24,
        22,
        27,
        21
      ]
    },
    {
      "q": "f(x,y) = 5x + 4y. Find f(-2,0)",
      "a": -10,
      "opts": [
        -7,
        -8,
        -10,
        -12
      ]
    },
    {
      "q": "f(x,y) = 3x^2 + 1y^2. Find f(-3,-5)",
      "a": 52,
      "opts": [
        54,
        52,
        51,
        49
      ]
    },
    {
      "q": "f(x,y) = 5x^2 + 1y^2. Find f(3,3)",
      "a": 54,
      "opts": [
        53,
        51,
        54,
        52
      ]
    },
    {
      "q": "f(x,y) = 3x + 5y. Find f(2,4)",
      "a": 26,
      "opts": [
        28,
        25,
        23,
        26
      ]
    },
    {
      "q": "f(x,y) = 4xy + 5x + 2y. Find f(-3,3)",
      "a": -45,
      "opts": [
        -47,
        -45,
        -48,
        -44
      ]
    },
    {
      "q": "f(x,y) = 3x + 1y. Find f(-3,-2)",
      "a": -11,
      "opts": [
        -13,
        -12,
        -14,
        -11
      ]
    },
    {
      "q": "f(x,y) = 4x^3 + 2y^2 + 3. Find f(0,-2)",
      "a": 11,
      "opts": [
        11,
        14,
        12,
        10
      ]
    },
    {
      "q": "f(x,y) = 3xy + 5x + 2y. Find f(3,-5)",
      "a": -40,
      "opts": [
        -37,
        -42,
        -40,
        -41
      ]
    },
    {
      "q": "f(x,y) = 5x^3 + 3y^2 + 5. Find f(1,3)",
      "a": 37,
      "opts": [
        35,
        34,
        37,
        39
      ]
    },
    {
      "q": "f(x,y) = 1xy + 3x + 3y. Find f(4,-5)",
      "a": -23,
      "opts": [
        -23,
        -22,
        -20,
        -25
      ]
    },
    {
      "q": "f(x,y) = 4x^3 + 3y^2 + 1. Find f(2,-4)",
      "a": 81,
      "opts": [
        78,
        83,
        82,
        81
      ]
    },
    {
      "q": "f(x,y) = 5x^3 + 1y^2 + 0. Find f(1,4)",
      "a": 21,
      "opts": [
        20,
        21,
        22,
        24
      ]
    },
    {
      "q": "f(x,y) = 4x + 3y. Find f(-5,0)",
      "a": -20,
      "opts": [
        -17,
        -23,
        -20,
        -19
      ]
    },
    {
      "q": "f(x,y) = 3x^2 + 2y^2. Find f(3,-2)",
      "a": 35,
      "opts": [
        35,
        36,
        38,
        34
      ]
    },
    {
      "q": "f(x,y) = 4x^2 + 5y^2. Find f(-5,1)",
      "a": 105,
      "opts": [
        105,
        103,
        108,
        107
      ]
    },
    {
      "q": "f(x,y) = 1x + 5y. Find f(3,4)",
      "a": 23,
      "opts": [
        23,
        26,
        25,
        24
      ]
    },
    {
      "q": "f(x,y) = 2xy + 5x + 2y. Find f(-3,-1)",
      "a": -11,
      "opts": [
        -11,
        -14,
        -13,
        -12
      ]
    },
    {
      "q": "f(x,y) = 5x + 1y. Find f(-4,5)",
      "a": -15,
      "opts": [
        -14,
        -17,
        -18,
        -15
      ]
    },
    {
      "q": "f(x,y) = 4x^2 + 2y^2. Find f(3,-4)",
      "a": 68,
      "opts": [
        68,
        65,
        69,
        66
      ]
    },
    {
      "q": "f(x,y) = 3x^3 + 5y^2 + 5. Find f(4,-2)",
      "a": 217,
      "opts": [
        219,
        215,
        218,
        217
      ]
    },
    {
      "q": "f(x,y) = 4xy + 5x + 4y. Find f(-4,-5)",
      "a": 40,
      "opts": [
        40,
        39,
        38,
        41
      ]
    },
    {
      "q": "f(x,y) = 4xy + 2x + 2y. Find f(4,0)",
      "a": 8,
      "opts": [
        8,
        7,
        9,
        6
      ]
    },
    {
      "q": "f(x,y) = 1x + 5y. Find f(-5,-2)",
      "a": -15,
      "opts": [
        -15,
        -12,
        -13,
        -18
      ]
    },
    {
      "q": "f(x,y) = 5x + 5y. Find f(-1,-1)",
      "a": -10,
      "opts": [
        -9,
        -13,
        -10,
        -7
      ]
    },
    {
      "q": "f(x,y) = 2x^3 + 2y^2 + 3. Find f(4,-4)",
      "a": 163,
      "opts": [
        162,
        165,
        160,
        163
      ]
    },
    {
      "q": "f(x,y) = 2x^3 + 3y^2 + 2. Find f(2,-2)",
      "a": 30,
      "opts": [
        33,
        27,
        30,
        31
      ]
    },
    {
      "q": "f(x,y) = 3x^2 + 4y^2. Find f(-1,-5)",
      "a": 103,
      "opts": [
        101,
        103,
        105,
        102
      ]
    },
    {
      "q": "f(x,y) = 3x + 5y. Find f(3,-3)",
      "a": -6,
      "opts": [
        -6,
        -8,
        -3,
        -9
      ]
    },
    {
      "q": "f(x,y) = 4x^3 + 4y^2 + 0. Find f(1,5)",
      "a": 104,
      "opts": [
        102,
        106,
        105,
        104
      ]
    },
    {
      "q": "f(x,y) = 3x^3 + 2y^2 + 3. Find f(-4,-5)",
      "a": -139,
      "opts": [
        -140,
        -137,
        -136,
        -139
      ]
    },
    {
      "q": "f(x,y) = 1x^2 + 2y^2. Find f(-4,-2)",
      "a": 24,
      "opts": [
        25,
        21,
        24,
        27
      ]
    },
    {
      "q": "f(x,y) = 4x + 2y. Find f(-4,-1)",
      "a": -18,
      "opts": [
        -16,
        -18,
        -19,
        -17
      ]
    },
    {
      "q": "f(x,y) = 5x^3 + 1y^2 + 4. Find f(0,-3)",
      "a": 13,
      "opts": [
        12,
        14,
        13,
        11
      ]
    },
    {
      "q": "f(x,y) = 3x^3 + 5y^2 + 3. Find f(-1,-2)",
      "a": 20,
      "opts": [
        21,
        20,
        17,
        23
      ]
    },
    {
      "q": "f(x,y) = 2x + 3y. Find f(3,2)",
      "a": 12,
      "opts": [
        10,
        15,
        9,
        12
      ]
    },
    {
      "q": "f(x,y) = 1x + 5y. Find f(2,-3)",
      "a": -13,
      "opts": [
        -16,
        -10,
        -13,
        -15
      ]
    },
    {
      "q": "f(x,y) = 3x + 3y. Find f(-5,1)",
      "a": -12,
      "opts": [
        -10,
        -13,
        -12,
        -15
      ]
    },
    {
      "q": "f(x,y) = 4xy + 4x + 0y. Find f(5,-4)",
      "a": -60,
      "opts": [
        -57,
        -60,
        -62,
        -63
      ]
    },
    {
      "q": "f(x,y) = 3x^3 + 4y^2 + 2. Find f(-2,1)",
      "a": -18,
      "opts": [
        -21,
        -17,
        -15,
        -18
      ]
    },
    {
      "q": "f(x,y) = 1x^3 + 3y^2 + 0. Find f(-5,-2)",
      "a": -113,
      "opts": [
        -110,
        -111,
        -112,
        -113
      ]
    },
    {
      "q": "f(x,y) = 5x + 3y. Find f(2,3)",
      "a": 19,
      "opts": [
        19,
        22,
        18,
        21
      ]
    },
    {
      "q": "f(x,y) = 2x + 3y. Find f(0,4)",
      "a": 12,
      "opts": [
        12,
        14,
        13,
        9
      ]
    },
    {
      "q": "f(x,y) = 2x^2 + 5y^2. Find f(-5,1)",
      "a": 55,
      "opts": [
        53,
        57,
        55,
        54
      ]
    },
    {
      "q": "f(x,y) = 1x^2 + 5y^2. Find f(0,4)",
      "a": 80,
      "opts": [
        77,
        81,
        78,
        80
      ]
    },
    {
      "q": "f(x,y) = 4x + 5y. Find f(5,-2)",
      "a": 10,
      "opts": [
        11,
        7,
        10,
        13
      ]
    },
    {
      "q": "f(x,y) = 1xy + 4x + 1y. Find f(3,-1)",
      "a": 8,
      "opts": [
        5,
        11,
        9,
        8
      ]
    },
    {
      "q": "f(x,y) = 5xy + 3x + 0y. Find f(3,1)",
      "a": 24,
      "opts": [
        24,
        27,
        26,
        25
      ]
    },
    {
      "q": "f(x,y) = 1x^2 + 4y^2. Find f(-4,-3)",
      "a": 52,
      "opts": [
        51,
        52,
        49,
        54
      ]
    },
    {
      "q": "f(x,y) = 2x^3 + 4y^2 + 4. Find f(-4,0)",
      "a": -124,
      "opts": [
        -124,
        -121,
        -127,
        -126
      ]
    },
    {
      "q": "f(x,y) = 1x^2 + 2y^2. Find f(0,-1)",
      "a": 2,
      "opts": [
        2,
        4,
        5,
        -1
      ]
    },
    {
      "q": "f(x,y) = 5xy + 4x + 3y. Find f(5,2)",
      "a": 76,
      "opts": [
        77,
        74,
        76,
        78
      ]
    },
    {
      "q": "f(x,y) = 3x^2 + 1y^2. Find f(0,-2)",
      "a": 4,
      "opts": [
        7,
        4,
        6,
        1
      ]
    },
    {
      "q": "f(x,y) = 2x^3 + 4y^2 + 5. Find f(-4,-1)",
      "a": -119,
      "opts": [
        -118,
        -119,
        -116,
        -117
      ]
    },
    {
      "q": "f(x,y) = 2xy + 1x + 1y. Find f(-4,0)",
      "a": -4,
      "opts": [
        -7,
        -4,
        -1,
        -3
      ]
    },
    {
      "q": "f(x,y) = 5x^3 + 5y^2 + 0. Find f(3,-3)",
      "a": 180,
      "opts": [
        180,
        181,
        182,
        178
      ]
    }
  ],
  "limits": [
    {
      "q": "lim(x,y)\u2192(-5,-5) of 1xy",
      "a": 25,
      "opts": [
        24,
        25,
        28,
        23
      ]
    },
    {
      "q": "lim(x,y)\u2192(2,-3) of 5xy",
      "a": -30,
      "opts": [
        -27,
        -30,
        -32,
        -29
      ]
    },
    {
      "q": "lim(x,y)\u2192(-4,-5) of 2x + 4y",
      "a": -28,
      "opts": [
        -30,
        -26,
        -28,
        -29
      ]
    },
    {
      "q": "lim(x,y)\u2192(0,-4) of 3x + 5y",
      "a": -20,
      "opts": [
        -20,
        -18,
        -23,
        -21
      ]
    },
    {
      "q": "lim(x,y)\u2192(3,-5) of 4x + 3y",
      "a": -3,
      "opts": [
        -5,
        -6,
        -3,
        -1
      ]
    },
    {
      "q": "lim(x,y)\u2192(-5,-1) of 5",
      "a": 5,
      "opts": [
        8,
        3,
        7,
        5
      ]
    },
    {
      "q": "lim(x,y)\u2192(-1,0) of 3x^2 + 1y^2",
      "a": 3,
      "opts": [
        0,
        3,
        1,
        4
      ]
    },
    {
      "q": "lim(x,y)\u2192(-4,5) of 3xy",
      "a": -60,
      "opts": [
        -58,
        -63,
        -57,
        -60
      ]
    },
    {
      "q": "lim(x,y)\u2192(-4,-5) of 4x + 1y",
      "a": -21,
      "opts": [
        -20,
        -21,
        -18,
        -23
      ]
    },
    {
      "q": "lim(x,y)\u2192(5,5) of 8",
      "a": 8,
      "opts": [
        8,
        6,
        9,
        10
      ]
    },
    {
      "q": "lim(x,y)\u2192(1,0) of 4x + 2y",
      "a": 4,
      "opts": [
        7,
        6,
        4,
        5
      ]
    },
    {
      "q": "lim(x,y)\u2192(-2,1) of 1x^2 + 2y^2",
      "a": 6,
      "opts": [
        6,
        3,
        4,
        8
      ]
    },
    {
      "q": "lim(x,y)\u2192(-5,-5) of 3xy",
      "a": 75,
      "opts": [
        74,
        76,
        72,
        75
      ]
    },
    {
      "q": "lim(x,y)\u2192(-1,-1) of 2xy",
      "a": 2,
      "opts": [
        4,
        3,
        5,
        2
      ]
    },
    {
      "q": "lim(x,y)\u2192(-5,-5) of 10",
      "a": 10,
      "opts": [
        12,
        13,
        10,
        11
      ]
    },
    {
      "q": "lim(x,y)\u2192(-2,-2) of 1xy",
      "a": 4,
      "opts": [
        4,
        3,
        2,
        6
      ]
    },
    {
      "q": "lim(x,y)\u2192(3,2) of 5xy",
      "a": 30,
      "opts": [
        31,
        29,
        30,
        28
      ]
    },
    {
      "q": "lim(x,y)\u2192(2,4) of 3x^2 + 4y^2",
      "a": 76,
      "opts": [
        73,
        76,
        79,
        78
      ]
    },
    {
      "q": "lim(x,y)\u2192(-3,2) of 10",
      "a": 10,
      "opts": [
        12,
        7,
        9,
        10
      ]
    },
    {
      "q": "lim(x,y)\u2192(-3,1) of 3x^2 + 1y^2",
      "a": 28,
      "opts": [
        28,
        26,
        30,
        25
      ]
    },
    {
      "q": "lim(x,y)\u2192(1,0) of 4x^2 + 3y^2",
      "a": 4,
      "opts": [
        1,
        4,
        5,
        3
      ]
    },
    {
      "q": "lim(x,y)\u2192(-4,-1) of 5x + 5y",
      "a": -25,
      "opts": [
        -22,
        -26,
        -28,
        -25
      ]
    },
    {
      "q": "lim(x,y)\u2192(2,-4) of 1x^2 + 2y^2",
      "a": 36,
      "opts": [
        39,
        34,
        38,
        36
      ]
    },
    {
      "q": "lim(x,y)\u2192(-2,5) of 3x + 4y",
      "a": 14,
      "opts": [
        17,
        15,
        14,
        12
      ]
    },
    {
      "q": "lim(x,y)\u2192(1,-5) of 7",
      "a": 7,
      "opts": [
        8,
        10,
        7,
        9
      ]
    },
    {
      "q": "lim(x,y)\u2192(0,-4) of 4xy",
      "a": 0,
      "opts": [
        1,
        0,
        2,
        -1
      ]
    },
    {
      "q": "lim(x,y)\u2192(3,4) of 4x^2 + 1y^2",
      "a": 52,
      "opts": [
        52,
        55,
        53,
        49
      ]
    },
    {
      "q": "lim(x,y)\u2192(4,-3) of 5xy",
      "a": -60,
      "opts": [
        -63,
        -60,
        -62,
        -57
      ]
    },
    {
      "q": "lim(x,y)\u2192(-2,1) of 5",
      "a": 5,
      "opts": [
        6,
        3,
        7,
        5
      ]
    },
    {
      "q": "lim(x,y)\u2192(2,-2) of 3xy",
      "a": -12,
      "opts": [
        -15,
        -13,
        -12,
        -9
      ]
    },
    {
      "q": "lim(x,y)\u2192(2,-4) of 5xy",
      "a": -40,
      "opts": [
        -40,
        -37,
        -43,
        -38
      ]
    },
    {
      "q": "lim(x,y)\u2192(4,-2) of 6",
      "a": 6,
      "opts": [
        6,
        4,
        3,
        9
      ]
    },
    {
      "q": "lim(x,y)\u2192(-3,2) of 3x + 5y",
      "a": 1,
      "opts": [
        3,
        2,
        1,
        -2
      ]
    },
    {
      "q": "lim(x,y)\u2192(4,1) of 1x^2 + 1y^2",
      "a": 17,
      "opts": [
        18,
        16,
        17,
        19
      ]
    },
    {
      "q": "lim(x,y)\u2192(-2,3) of 3x^2 + 5y^2",
      "a": 57,
      "opts": [
        59,
        56,
        58,
        57
      ]
    },
    {
      "q": "lim(x,y)\u2192(-5,-4) of 5xy",
      "a": 100,
      "opts": [
        98,
        102,
        97,
        100
      ]
    },
    {
      "q": "lim(x,y)\u2192(1,-5) of 10",
      "a": 10,
      "opts": [
        7,
        10,
        9,
        12
      ]
    },
    {
      "q": "lim(x,y)\u2192(-5,-3) of 3",
      "a": 3,
      "opts": [
        2,
        0,
        4,
        3
      ]
    },
    {
      "q": "lim(x,y)\u2192(-5,0) of 2xy",
      "a": 0,
      "opts": [
        2,
        -3,
        0,
        1
      ]
    },
    {
      "q": "lim(x,y)\u2192(-5,-4) of 5x^2 + 3y^2",
      "a": 173,
      "opts": [
        173,
        172,
        170,
        175
      ]
    },
    {
      "q": "lim(x,y)\u2192(-1,1) of 5x^2 + 3y^2",
      "a": 8,
      "opts": [
        8,
        6,
        5,
        7
      ]
    },
    {
      "q": "lim(x,y)\u2192(4,0) of 2x^2 + 4y^2",
      "a": 32,
      "opts": [
        29,
        32,
        35,
        34
      ]
    },
    {
      "q": "lim(x,y)\u2192(-3,-1) of 1x^2 + 5y^2",
      "a": 14,
      "opts": [
        16,
        15,
        11,
        14
      ]
    },
    {
      "q": "lim(x,y)\u2192(-2,-4) of 1x + 5y",
      "a": -22,
      "opts": [
        -24,
        -25,
        -22,
        -21
      ]
    },
    {
      "q": "lim(x,y)\u2192(-1,0) of 5",
      "a": 5,
      "opts": [
        2,
        3,
        6,
        5
      ]
    },
    {
      "q": "lim(x,y)\u2192(5,-4) of 4x^2 + 4y^2",
      "a": 164,
      "opts": [
        162,
        164,
        167,
        163
      ]
    },
    {
      "q": "lim(x,y)\u2192(-2,-5) of 4xy",
      "a": 40,
      "opts": [
        40,
        38,
        42,
        37
      ]
    },
    {
      "q": "lim(x,y)\u2192(3,0) of 3x + 4y",
      "a": 9,
      "opts": [
        7,
        11,
        6,
        9
      ]
    },
    {
      "q": "lim(x,y)\u2192(-5,5) of 7",
      "a": 7,
      "opts": [
        9,
        7,
        10,
        6
      ]
    },
    {
      "q": "lim(x,y)\u2192(5,3) of 2xy",
      "a": 30,
      "opts": [
        28,
        29,
        32,
        30
      ]
    },
    {
      "q": "lim(x,y)\u2192(1,2) of 2x^2 + 5y^2",
      "a": 22,
      "opts": [
        21,
        25,
        23,
        22
      ]
    },
    {
      "q": "lim(x,y)\u2192(5,0) of 10",
      "a": 10,
      "opts": [
        10,
        13,
        9,
        8
      ]
    },
    {
      "q": "lim(x,y)\u2192(4,3) of 3",
      "a": 3,
      "opts": [
        3,
        0,
        4,
        6
      ]
    },
    {
      "q": "lim(x,y)\u2192(0,-1) of 8",
      "a": 8,
      "opts": [
        8,
        5,
        6,
        11
      ]
    },
    {
      "q": "lim(x,y)\u2192(-5,5) of 5x^2 + 4y^2",
      "a": 225,
      "opts": [
        227,
        225,
        223,
        224
      ]
    },
    {
      "q": "lim(x,y)\u2192(-2,4) of 7",
      "a": 7,
      "opts": [
        8,
        7,
        10,
        4
      ]
    },
    {
      "q": "lim(x,y)\u2192(4,1) of 4x + 2y",
      "a": 18,
      "opts": [
        15,
        16,
        17,
        18
      ]
    },
    {
      "q": "lim(x,y)\u2192(5,1) of 1x + 4y",
      "a": 9,
      "opts": [
        8,
        12,
        10,
        9
      ]
    },
    {
      "q": "lim(x,y)\u2192(-5,-5) of 2x^2 + 5y^2",
      "a": 175,
      "opts": [
        178,
        174,
        175,
        176
      ]
    },
    {
      "q": "lim(x,y)\u2192(5,3) of 4x + 4y",
      "a": 32,
      "opts": [
        35,
        29,
        34,
        32
      ]
    },
    {
      "q": "lim(x,y)\u2192(5,-4) of 1x^2 + 3y^2",
      "a": 73,
      "opts": [
        73,
        75,
        76,
        70
      ]
    },
    {
      "q": "lim(x,y)\u2192(3,-4) of 2x^2 + 1y^2",
      "a": 34,
      "opts": [
        34,
        36,
        37,
        32
      ]
    },
    {
      "q": "lim(x,y)\u2192(3,-3) of 1xy",
      "a": -9,
      "opts": [
        -8,
        -7,
        -6,
        -9
      ]
    },
    {
      "q": "lim(x,y)\u2192(3,-4) of 1xy",
      "a": -12,
      "opts": [
        -11,
        -12,
        -14,
        -13
      ]
    },
    {
      "q": "lim(x,y)\u2192(2,-2) of 3x + 1y",
      "a": 4,
      "opts": [
        4,
        1,
        2,
        5
      ]
    },
    {
      "q": "lim(x,y)\u2192(-1,-3) of 4xy",
      "a": 12,
      "opts": [
        12,
        10,
        9,
        14
      ]
    },
    {
      "q": "lim(x,y)\u2192(-2,2) of 1x^2 + 1y^2",
      "a": 8,
      "opts": [
        6,
        5,
        8,
        11
      ]
    },
    {
      "q": "lim(x,y)\u2192(1,-5) of 1x^2 + 2y^2",
      "a": 51,
      "opts": [
        49,
        52,
        51,
        50
      ]
    },
    {
      "q": "lim(x,y)\u2192(-5,0) of 5",
      "a": 5,
      "opts": [
        3,
        5,
        8,
        7
      ]
    },
    {
      "q": "lim(x,y)\u2192(3,-4) of 4xy",
      "a": -48,
      "opts": [
        -45,
        -48,
        -49,
        -47
      ]
    },
    {
      "q": "lim(x,y)\u2192(2,4) of 2xy",
      "a": 16,
      "opts": [
        15,
        19,
        16,
        13
      ]
    },
    {
      "q": "lim(x,y)\u2192(-4,-5) of 3x^2 + 3y^2",
      "a": 123,
      "opts": [
        123,
        120,
        125,
        121
      ]
    },
    {
      "q": "lim(x,y)\u2192(-1,5) of 5x^2 + 4y^2",
      "a": 105,
      "opts": [
        105,
        104,
        102,
        103
      ]
    },
    {
      "q": "lim(x,y)\u2192(-1,5) of 1",
      "a": 1,
      "opts": [
        -1,
        1,
        -2,
        3
      ]
    },
    {
      "q": "lim(x,y)\u2192(-1,2) of 5x^2 + 2y^2",
      "a": 13,
      "opts": [
        14,
        13,
        15,
        12
      ]
    },
    {
      "q": "lim(x,y)\u2192(0,0) of 6",
      "a": 6,
      "opts": [
        6,
        8,
        7,
        3
      ]
    },
    {
      "q": "lim(x,y)\u2192(1,1) of 4",
      "a": 4,
      "opts": [
        4,
        6,
        1,
        7
      ]
    },
    {
      "q": "lim(x,y)\u2192(5,2) of 3x^2 + 3y^2",
      "a": 87,
      "opts": [
        86,
        87,
        88,
        90
      ]
    },
    {
      "q": "lim(x,y)\u2192(2,4) of 3xy",
      "a": 24,
      "opts": [
        26,
        21,
        22,
        24
      ]
    },
    {
      "q": "lim(x,y)\u2192(-2,0) of 5xy",
      "a": 0,
      "opts": [
        -3,
        0,
        -1,
        3
      ]
    },
    {
      "q": "lim(x,y)\u2192(4,5) of 5x^2 + 2y^2",
      "a": 130,
      "opts": [
        131,
        128,
        129,
        130
      ]
    },
    {
      "q": "lim(x,y)\u2192(-3,-2) of 1xy",
      "a": 6,
      "opts": [
        9,
        7,
        6,
        8
      ]
    },
    {
      "q": "lim(x,y)\u2192(-1,2) of 1x^2 + 5y^2",
      "a": 21,
      "opts": [
        23,
        22,
        21,
        24
      ]
    },
    {
      "q": "lim(x,y)\u2192(0,-5) of 5xy",
      "a": 0,
      "opts": [
        -1,
        0,
        -2,
        -3
      ]
    },
    {
      "q": "lim(x,y)\u2192(0,0) of 4x + 3y",
      "a": 0,
      "opts": [
        0,
        1,
        -1,
        3
      ]
    },
    {
      "q": "lim(x,y)\u2192(-1,2) of 5x^2 + 3y^2",
      "a": 17,
      "opts": [
        20,
        17,
        15,
        14
      ]
    },
    {
      "q": "lim(x,y)\u2192(2,-1) of 2x^2 + 1y^2",
      "a": 9,
      "opts": [
        6,
        11,
        10,
        9
      ]
    },
    {
      "q": "lim(x,y)\u2192(-3,1) of 1x^2 + 1y^2",
      "a": 10,
      "opts": [
        7,
        10,
        11,
        12
      ]
    },
    {
      "q": "lim(x,y)\u2192(4,3) of 2x + 4y",
      "a": 20,
      "opts": [
        19,
        18,
        20,
        21
      ]
    },
    {
      "q": "lim(x,y)\u2192(-2,3) of 1xy",
      "a": -6,
      "opts": [
        -3,
        -8,
        -9,
        -6
      ]
    },
    {
      "q": "lim(x,y)\u2192(0,-3) of 4",
      "a": 4,
      "opts": [
        6,
        4,
        7,
        5
      ]
    },
    {
      "q": "lim(x,y)\u2192(5,0) of 5xy",
      "a": 0,
      "opts": [
        -3,
        0,
        3,
        1
      ]
    },
    {
      "q": "lim(x,y)\u2192(5,-5) of 3x + 2y",
      "a": 5,
      "opts": [
        5,
        6,
        2,
        7
      ]
    },
    {
      "q": "lim(x,y)\u2192(5,2) of 5",
      "a": 5,
      "opts": [
        2,
        3,
        6,
        5
      ]
    },
    {
      "q": "lim(x,y)\u2192(5,4) of 5x + 4y",
      "a": 41,
      "opts": [
        43,
        40,
        41,
        44
      ]
    },
    {
      "q": "lim(x,y)\u2192(2,0) of 3x^2 + 3y^2",
      "a": 12,
      "opts": [
        12,
        15,
        10,
        14
      ]
    },
    {
      "q": "lim(x,y)\u2192(-2,3) of 10",
      "a": 10,
      "opts": [
        13,
        10,
        7,
        8
      ]
    },
    {
      "q": "lim(x,y)\u2192(-1,4) of 1x^2 + 3y^2",
      "a": 49,
      "opts": [
        49,
        52,
        47,
        50
      ]
    },
    {
      "q": "lim(x,y)\u2192(-3,5) of 5x^2 + 2y^2",
      "a": 95,
      "opts": [
        96,
        95,
        94,
        92
      ]
    },
    {
      "q": "lim(x,y)\u2192(5,0) of 1x + 2y",
      "a": 5,
      "opts": [
        3,
        5,
        6,
        2
      ]
    }
  ],
  "partials": [
    {
      "q": "f(x,y) = 1x + 1y. Find \u2202f/\u2202y",
      "a": 1,
      "opts": [
        3,
        2,
        0,
        1
      ]
    },
    {
      "q": "f(x,y) = 5x^3 + 2y^2 + 2. Find \u2202f/\u2202y at (0,4)",
      "a": 16,
      "opts": [
        17,
        16,
        18,
        19
      ]
    },
    {
      "q": "f(x,y) = 4x^2 + 5y^2. Find \u2202f/\u2202x at (-4,1)",
      "a": -32,
      "opts": [
        -30,
        -29,
        -34,
        -32
      ]
    },
    {
      "q": "f(x,y) = 4x^3 + 3y^2 + 0. Find \u2202f/\u2202x at (-1,1)",
      "a": 12,
      "opts": [
        11,
        12,
        13,
        9
      ]
    },
    {
      "q": "f(x,y) = 5x + 3y. Find \u2202f/\u2202x",
      "a": 5,
      "opts": [
        3,
        2,
        8,
        5
      ]
    },
    {
      "q": "f(x,y) = 5x^2 + 3y^2. Find \u2202f/\u2202y at (2,4)",
      "a": 24,
      "opts": [
        23,
        26,
        24,
        25
      ]
    },
    {
      "q": "f(x,y) = 1x^2 + 5y^2. Find \u2202f/\u2202y at (1,-2)",
      "a": -20,
      "opts": [
        -21,
        -17,
        -20,
        -23
      ]
    },
    {
      "q": "f(x,y) = 2x + 3y. Find \u2202f/\u2202x",
      "a": 2,
      "opts": [
        4,
        1,
        2,
        0
      ]
    },
    {
      "q": "f(x,y) = 1x + 5y. Find \u2202f/\u2202y",
      "a": 5,
      "opts": [
        3,
        4,
        5,
        2
      ]
    },
    {
      "q": "f(x,y) = 2xy + 4x + 5y. Find \u2202f/\u2202x at (5,-3)",
      "a": -2,
      "opts": [
        -5,
        0,
        -2,
        1
      ]
    },
    {
      "q": "f(x,y) = 4x + 4y. Find \u2202f/\u2202y",
      "a": 4,
      "opts": [
        2,
        7,
        5,
        4
      ]
    },
    {
      "q": "f(x,y) = 4x^3 + 3y^2 + 1. Find \u2202f/\u2202x at (1,5)",
      "a": 12,
      "opts": [
        10,
        13,
        11,
        12
      ]
    },
    {
      "q": "f(x,y) = 1x^2 + 2y^2. Find \u2202f/\u2202y at (5,3)",
      "a": 12,
      "opts": [
        11,
        12,
        10,
        15
      ]
    },
    {
      "q": "f(x,y) = 1x^3 + 2y^2 + 1. Find \u2202f/\u2202x at (1,4)",
      "a": 3,
      "opts": [
        4,
        5,
        6,
        3
      ]
    },
    {
      "q": "f(x,y) = 4x + 2y. Find \u2202f/\u2202y",
      "a": 2,
      "opts": [
        4,
        -1,
        3,
        2
      ]
    },
    {
      "q": "f(x,y) = 4x^3 + 4y^2 + 2. Find \u2202f/\u2202y at (-2,1)",
      "a": 8,
      "opts": [
        7,
        6,
        8,
        5
      ]
    },
    {
      "q": "f(x,y) = 5xy + 3x + 3y. Find \u2202f/\u2202x at (-1,1)",
      "a": 8,
      "opts": [
        7,
        10,
        8,
        9
      ]
    },
    {
      "q": "f(x,y) = 3xy + 2x + 1y. Find \u2202f/\u2202y at (1,0)",
      "a": 4,
      "opts": [
        7,
        4,
        2,
        1
      ]
    },
    {
      "q": "f(x,y) = 4xy + 2x + 2y. Find \u2202f/\u2202y at (-5,-3)",
      "a": -18,
      "opts": [
        -20,
        -15,
        -19,
        -18
      ]
    },
    {
      "q": "f(x,y) = 5x^2 + 5y^2. Find \u2202f/\u2202x at (-4,-1)",
      "a": -40,
      "opts": [
        -40,
        -37,
        -39,
        -41
      ]
    },
    {
      "q": "f(x,y) = 4x^2 + 2y^2. Find \u2202f/\u2202x at (3,4)",
      "a": 24,
      "opts": [
        26,
        24,
        22,
        25
      ]
    },
    {
      "q": "f(x,y) = 5x^3 + 4y^2 + 3. Find \u2202f/\u2202y at (-2,-4)",
      "a": -32,
      "opts": [
        -29,
        -33,
        -32,
        -35
      ]
    },
    {
      "q": "f(x,y) = 2x^3 + 1y^2 + 5. Find \u2202f/\u2202x at (4,-2)",
      "a": 96,
      "opts": [
        98,
        96,
        97,
        93
      ]
    },
    {
      "q": "f(x,y) = 1x^2 + 3y^2. Find \u2202f/\u2202y at (-4,-1)",
      "a": -6,
      "opts": [
        -6,
        -8,
        -3,
        -9
      ]
    },
    {
      "q": "f(x,y) = 4x^3 + 1y^2 + 0. Find \u2202f/\u2202y at (-1,-2)",
      "a": -4,
      "opts": [
        -5,
        -4,
        -6,
        -2
      ]
    },
    {
      "q": "f(x,y) = 1xy + 3x + 0y. Find \u2202f/\u2202y at (-2,-1)",
      "a": -2,
      "opts": [
        -2,
        -5,
        -3,
        -4
      ]
    },
    {
      "q": "f(x,y) = 1xy + 1x + 4y. Find \u2202f/\u2202y at (-2,-4)",
      "a": 2,
      "opts": [
        1,
        2,
        -1,
        0
      ]
    },
    {
      "q": "f(x,y) = 4x^2 + 4y^2. Find \u2202f/\u2202y at (-5,-3)",
      "a": -24,
      "opts": [
        -27,
        -21,
        -22,
        -24
      ]
    },
    {
      "q": "f(x,y) = 4x^2 + 2y^2. Find \u2202f/\u2202x at (-5,-2)",
      "a": -40,
      "opts": [
        -40,
        -38,
        -41,
        -37
      ]
    },
    {
      "q": "f(x,y) = 4x + 5y. Find \u2202f/\u2202x",
      "a": 4,
      "opts": [
        4,
        5,
        2,
        6
      ]
    },
    {
      "q": "f(x,y) = 2x^3 + 2y^2 + 0. Find \u2202f/\u2202x at (-2,4)",
      "a": 24,
      "opts": [
        25,
        21,
        24,
        23
      ]
    },
    {
      "q": "f(x,y) = 2x^3 + 3y^2 + 5. Find \u2202f/\u2202y at (4,0)",
      "a": 0,
      "opts": [
        2,
        1,
        -2,
        0
      ]
    },
    {
      "q": "f(x,y) = 1x^2 + 3y^2. Find \u2202f/\u2202y at (-3,5)",
      "a": 30,
      "opts": [
        30,
        29,
        31,
        28
      ]
    },
    {
      "q": "f(x,y) = 1xy + 1x + 1y. Find \u2202f/\u2202x at (-4,-4)",
      "a": -3,
      "opts": [
        -4,
        0,
        -6,
        -3
      ]
    },
    {
      "q": "f(x,y) = 3xy + 5x + 0y. Find \u2202f/\u2202x at (-2,1)",
      "a": 8,
      "opts": [
        5,
        10,
        8,
        7
      ]
    },
    {
      "q": "f(x,y) = 4x^3 + 4y^2 + 0. Find \u2202f/\u2202y at (-4,1)",
      "a": 8,
      "opts": [
        8,
        10,
        5,
        9
      ]
    },
    {
      "q": "f(x,y) = 1x^2 + 1y^2. Find \u2202f/\u2202x at (4,0)",
      "a": 8,
      "opts": [
        8,
        10,
        5,
        7
      ]
    },
    {
      "q": "f(x,y) = 1xy + 5x + 1y. Find \u2202f/\u2202y at (0,-4)",
      "a": 1,
      "opts": [
        3,
        -1,
        4,
        1
      ]
    },
    {
      "q": "f(x,y) = 2x^3 + 3y^2 + 0. Find \u2202f/\u2202x at (5,-1)",
      "a": 150,
      "opts": [
        149,
        152,
        147,
        150
      ]
    },
    {
      "q": "f(x,y) = 4x^2 + 4y^2. Find \u2202f/\u2202y at (-4,-3)",
      "a": -24,
      "opts": [
        -21,
        -23,
        -26,
        -24
      ]
    },
    {
      "q": "f(x,y) = 5x^2 + 5y^2. Find \u2202f/\u2202x at (-5,-2)",
      "a": -50,
      "opts": [
        -47,
        -48,
        -52,
        -50
      ]
    },
    {
      "q": "f(x,y) = 3xy + 5x + 1y. Find \u2202f/\u2202x at (5,-4)",
      "a": -7,
      "opts": [
        -7,
        -6,
        -8,
        -9
      ]
    },
    {
      "q": "f(x,y) = 4xy + 2x + 0y. Find \u2202f/\u2202x at (-1,-1)",
      "a": -2,
      "opts": [
        -5,
        -2,
        -4,
        -1
      ]
    },
    {
      "q": "f(x,y) = 4x + 5y. Find \u2202f/\u2202y",
      "a": 5,
      "opts": [
        5,
        3,
        8,
        2
      ]
    },
    {
      "q": "f(x,y) = 2xy + 1x + 2y. Find \u2202f/\u2202y at (4,4)",
      "a": 10,
      "opts": [
        10,
        11,
        12,
        7
      ]
    },
    {
      "q": "f(x,y) = 2x + 1y. Find \u2202f/\u2202y",
      "a": 1,
      "opts": [
        4,
        1,
        0,
        3
      ]
    },
    {
      "q": "f(x,y) = 4x^2 + 5y^2. Find \u2202f/\u2202y at (2,-5)",
      "a": -50,
      "opts": [
        -53,
        -52,
        -47,
        -50
      ]
    },
    {
      "q": "f(x,y) = 5x^3 + 2y^2 + 5. Find \u2202f/\u2202x at (-5,-1)",
      "a": 375,
      "opts": [
        377,
        375,
        376,
        378
      ]
    },
    {
      "q": "f(x,y) = 1x^3 + 5y^2 + 3. Find \u2202f/\u2202y at (3,-1)",
      "a": -10,
      "opts": [
        -7,
        -8,
        -10,
        -9
      ]
    },
    {
      "q": "f(x,y) = 4x^2 + 2y^2. Find \u2202f/\u2202x at (-5,-1)",
      "a": -40,
      "opts": [
        -40,
        -38,
        -42,
        -37
      ]
    },
    {
      "q": "f(x,y) = 3x + 5y. Find \u2202f/\u2202y",
      "a": 5,
      "opts": [
        7,
        3,
        5,
        4
      ]
    },
    {
      "q": "f(x,y) = 4xy + 4x + 3y. Find \u2202f/\u2202x at (2,2)",
      "a": 12,
      "opts": [
        13,
        15,
        14,
        12
      ]
    },
    {
      "q": "f(x,y) = 4xy + 1x + 0y. Find \u2202f/\u2202y at (1,1)",
      "a": 4,
      "opts": [
        4,
        1,
        5,
        3
      ]
    },
    {
      "q": "f(x,y) = 1xy + 4x + 4y. Find \u2202f/\u2202y at (-4,-4)",
      "a": 0,
      "opts": [
        -3,
        -2,
        0,
        3
      ]
    },
    {
      "q": "f(x,y) = 5x^3 + 4y^2 + 2. Find \u2202f/\u2202y at (5,0)",
      "a": 0,
      "opts": [
        3,
        -3,
        0,
        -1
      ]
    },
    {
      "q": "f(x,y) = 5x + 4y. Find \u2202f/\u2202x",
      "a": 5,
      "opts": [
        4,
        3,
        5,
        2
      ]
    },
    {
      "q": "f(x,y) = 3xy + 4x + 1y. Find \u2202f/\u2202x at (0,-1)",
      "a": 1,
      "opts": [
        1,
        0,
        2,
        3
      ]
    },
    {
      "q": "f(x,y) = 4x^2 + 1y^2. Find \u2202f/\u2202x at (-3,-3)",
      "a": -24,
      "opts": [
        -24,
        -22,
        -27,
        -21
      ]
    },
    {
      "q": "f(x,y) = 2x^3 + 5y^2 + 1. Find \u2202f/\u2202y at (5,-5)",
      "a": -50,
      "opts": [
        -53,
        -51,
        -50,
        -52
      ]
    },
    {
      "q": "f(x,y) = 1x^3 + 4y^2 + 1. Find \u2202f/\u2202x at (-4,-2)",
      "a": 48,
      "opts": [
        51,
        48,
        45,
        47
      ]
    },
    {
      "q": "f(x,y) = 2x^3 + 1y^2 + 0. Find \u2202f/\u2202x at (-1,4)",
      "a": 6,
      "opts": [
        6,
        3,
        5,
        7
      ]
    },
    {
      "q": "f(x,y) = 3xy + 3x + 5y. Find \u2202f/\u2202y at (-2,1)",
      "a": -1,
      "opts": [
        -2,
        -1,
        2,
        1
      ]
    },
    {
      "q": "f(x,y) = 3x + 1y. Find \u2202f/\u2202y",
      "a": 1,
      "opts": [
        -1,
        3,
        1,
        -2
      ]
    },
    {
      "q": "f(x,y) = 3xy + 5x + 1y. Find \u2202f/\u2202y at (-4,5)",
      "a": -11,
      "opts": [
        -9,
        -8,
        -11,
        -10
      ]
    },
    {
      "q": "f(x,y) = 2x^3 + 1y^2 + 5. Find \u2202f/\u2202x at (1,-5)",
      "a": 6,
      "opts": [
        3,
        6,
        8,
        9
      ]
    },
    {
      "q": "f(x,y) = 4x^2 + 5y^2. Find \u2202f/\u2202y at (-1,2)",
      "a": 20,
      "opts": [
        20,
        19,
        21,
        18
      ]
    },
    {
      "q": "f(x,y) = 4xy + 4x + 3y. Find \u2202f/\u2202y at (1,0)",
      "a": 7,
      "opts": [
        7,
        5,
        10,
        4
      ]
    },
    {
      "q": "f(x,y) = 1xy + 5x + 0y. Find \u2202f/\u2202y at (-2,-1)",
      "a": -2,
      "opts": [
        -5,
        -4,
        1,
        -2
      ]
    },
    {
      "q": "f(x,y) = 5x + 3y. Find \u2202f/\u2202y",
      "a": 3,
      "opts": [
        2,
        6,
        4,
        3
      ]
    },
    {
      "q": "f(x,y) = 3xy + 1x + 4y. Find \u2202f/\u2202y at (2,3)",
      "a": 10,
      "opts": [
        8,
        11,
        13,
        10
      ]
    },
    {
      "q": "f(x,y) = 4xy + 5x + 4y. Find \u2202f/\u2202x at (3,-4)",
      "a": -11,
      "opts": [
        -11,
        -12,
        -8,
        -14
      ]
    },
    {
      "q": "f(x,y) = 4x^3 + 1y^2 + 0. Find \u2202f/\u2202y at (-1,5)",
      "a": 10,
      "opts": [
        11,
        13,
        8,
        10
      ]
    },
    {
      "q": "f(x,y) = 2x^3 + 3y^2 + 1. Find \u2202f/\u2202y at (-2,1)",
      "a": 6,
      "opts": [
        9,
        6,
        8,
        7
      ]
    },
    {
      "q": "f(x,y) = 2x + 3y. Find \u2202f/\u2202x",
      "a": 2,
      "opts": [
        3,
        2,
        5,
        0
      ]
    },
    {
      "q": "f(x,y) = 1xy + 3x + 0y. Find \u2202f/\u2202y at (3,5)",
      "a": 3,
      "opts": [
        0,
        2,
        3,
        6
      ]
    },
    {
      "q": "f(x,y) = 4x^3 + 5y^2 + 0. Find \u2202f/\u2202y at (5,0)",
      "a": 0,
      "opts": [
        0,
        -2,
        2,
        -1
      ]
    },
    {
      "q": "f(x,y) = 1xy + 2x + 5y. Find \u2202f/\u2202x at (3,2)",
      "a": 4,
      "opts": [
        4,
        7,
        2,
        3
      ]
    },
    {
      "q": "f(x,y) = 1x + 4y. Find \u2202f/\u2202y",
      "a": 4,
      "opts": [
        4,
        3,
        7,
        6
      ]
    },
    {
      "q": "f(x,y) = 4x + 5y. Find \u2202f/\u2202y",
      "a": 5,
      "opts": [
        6,
        3,
        2,
        5
      ]
    },
    {
      "q": "f(x,y) = 2xy + 3x + 1y. Find \u2202f/\u2202x at (1,1)",
      "a": 5,
      "opts": [
        7,
        4,
        6,
        5
      ]
    },
    {
      "q": "f(x,y) = 2x + 5y. Find \u2202f/\u2202x",
      "a": 2,
      "opts": [
        0,
        1,
        3,
        2
      ]
    },
    {
      "q": "f(x,y) = 3x + 4y. Find \u2202f/\u2202y",
      "a": 4,
      "opts": [
        7,
        5,
        4,
        3
      ]
    },
    {
      "q": "f(x,y) = 1x^3 + 5y^2 + 1. Find \u2202f/\u2202x at (-1,-1)",
      "a": 3,
      "opts": [
        3,
        2,
        1,
        0
      ]
    },
    {
      "q": "f(x,y) = 2xy + 5x + 0y. Find \u2202f/\u2202y at (2,1)",
      "a": 4,
      "opts": [
        6,
        4,
        2,
        1
      ]
    },
    {
      "q": "f(x,y) = 4x + 5y. Find \u2202f/\u2202x",
      "a": 4,
      "opts": [
        2,
        7,
        1,
        4
      ]
    },
    {
      "q": "f(x,y) = 1x^3 + 3y^2 + 0. Find \u2202f/\u2202x at (0,-5)",
      "a": 0,
      "opts": [
        1,
        2,
        -2,
        0
      ]
    },
    {
      "q": "f(x,y) = 4x + 3y. Find \u2202f/\u2202x",
      "a": 4,
      "opts": [
        5,
        6,
        4,
        3
      ]
    },
    {
      "q": "f(x,y) = 4x^3 + 2y^2 + 1. Find \u2202f/\u2202y at (-1,-5)",
      "a": -20,
      "opts": [
        -20,
        -23,
        -21,
        -17
      ]
    },
    {
      "q": "f(x,y) = 5xy + 1x + 5y. Find \u2202f/\u2202x at (5,-3)",
      "a": -14,
      "opts": [
        -12,
        -17,
        -16,
        -14
      ]
    },
    {
      "q": "f(x,y) = 1xy + 1x + 0y. Find \u2202f/\u2202x at (2,-4)",
      "a": -3,
      "opts": [
        0,
        -6,
        -3,
        -5
      ]
    },
    {
      "q": "f(x,y) = 1x^2 + 2y^2. Find \u2202f/\u2202y at (2,-2)",
      "a": -8,
      "opts": [
        -9,
        -10,
        -8,
        -6
      ]
    },
    {
      "q": "f(x,y) = 1x^2 + 1y^2. Find \u2202f/\u2202y at (-3,1)",
      "a": 2,
      "opts": [
        0,
        2,
        3,
        5
      ]
    },
    {
      "q": "f(x,y) = 2x^2 + 2y^2. Find \u2202f/\u2202x at (0,2)",
      "a": 0,
      "opts": [
        3,
        -3,
        1,
        0
      ]
    },
    {
      "q": "f(x,y) = 5x^3 + 5y^2 + 0. Find \u2202f/\u2202y at (-3,-5)",
      "a": -50,
      "opts": [
        -48,
        -47,
        -50,
        -49
      ]
    },
    {
      "q": "f(x,y) = 4x + 4y. Find \u2202f/\u2202x",
      "a": 4,
      "opts": [
        2,
        4,
        6,
        7
      ]
    },
    {
      "q": "f(x,y) = 5x^3 + 1y^2 + 2. Find \u2202f/\u2202y at (2,-2)",
      "a": -4,
      "opts": [
        -6,
        -4,
        -1,
        -2
      ]
    },
    {
      "q": "f(x,y) = 4xy + 5x + 3y. Find \u2202f/\u2202x at (-3,0)",
      "a": 5,
      "opts": [
        5,
        6,
        8,
        7
      ]
    },
    {
      "q": "f(x,y) = 3x + 3y. Find \u2202f/\u2202y",
      "a": 3,
      "opts": [
        4,
        0,
        3,
        5
      ]
    },
    {
      "q": "f(x,y) = 3x^3 + 4y^2 + 2. Find \u2202f/\u2202x at (1,-3)",
      "a": 9,
      "opts": [
        12,
        9,
        10,
        11
      ]
    },
    {
      "q": "f(x,y) = 2xy + 2x + 5y. Find \u2202f/\u2202x at (0,1)",
      "a": 4,
      "opts": [
        4,
        5,
        7,
        2
      ]
    }
  ]
};
    
    const pool = questions[topic];
    const q = pool[Math.floor(Math.random() * pool.length)];
    return { ...q, topic, options: [...q.opts].sort(() => Math.random() - 0.5) };
  };

  const calculateEnemyMove = (currentRound, currentStreak, currentEnemyClass) => {
    const baseAcc = 0.50 + (currentRound * 0.05);
    const penalty = Math.min(currentStreak * 0.05, 0.15);
    const finalAcc = Math.max(0.50, Math.min(0.90, baseAcc - penalty));
    const willSucceed = Math.random() < finalAcc;
    const baseDamage = 20 + (currentRound * 3);
    const enemyBonus = currentEnemyClass ? classes[currentEnemyClass].bonusDamage : 0;
    const displayDamage = baseDamage + enemyBonus + Math.floor(Math.random() * 8);
    return { 
      willSucceed, 
      damage: willSucceed ? displayDamage : 0,
      displayDamage,
      accuracy: Math.round(finalAcc * 100)
    };
  };

  const newQuestion = () => {
    setCurrentQuestion(generateQuestion());
    setTimeLeft(maxTime);
    setSelectedAnswer(null);
    setFeedback('');
    setCurrentTurn('player');
    setEnemyNextMove(calculateEnemyMove(round, questionStreak, enemyClass));
  };

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

  const nextRound = () => {
    addLog('Victory!');
    const nextRoundNum = round + 1;
    setRound(nextRoundNum);
    
    if (nextRoundNum >= 3) {
      const classKeys = Object.keys(classes);
      const randomClass = classKeys[Math.floor(Math.random() * classKeys.length)];
      setEnemyClass(randomClass);
    }
    
    setTimeout(() => {
      const newMaxEnemy = 100 + (round * 20);
      setMaxEnemyHP(newMaxEnemy);
      setEnemyHP(newMaxEnemy);
      // Player max HP stays the same, only heal
      setPlayerHP(Math.min(maxPlayerHP, playerHP + 50));
      setEnergy(maxEnergy);
      setShield(0);
      setQuestionStreak(0);
      setBattleLog([]);
      newQuestion();
    }, 2000);
  };

  const enemyAttack = () => {
    setCurrentTurn('enemy');
    setEnemyThinking(true);
    
    // Check if enemy will use ability (30% chance if they have a class and round >= 3)
    const willUseAbility = enemyClass && Math.random() < 0.3;
    
    setTimeout(() => {
      setEnemyThinking(false);
      
      if (willUseAbility) {
        // Enemy uses their class ability
        if (enemyClass === 'warrior') {
          addLog('Enemy uses Shield Wall!');
          setEnemyAnimation('heal');
          setTimeout(() => {
            setEnemyAnimation('');
            newQuestion();
          }, 1000);
        } else if (enemyClass === 'mage') {
          const result = applyDamage(35, true);
          addLog(`Enemy Arcane Surge! ${result.actualDamage} damage!`);
          setEnemyAnimation('attack');
          setPlayerAnimation('shake');
          setTimeout(() => {
            setPlayerAnimation('');
            setEnemyAnimation('');
            if (result.newHP <= 0) {
              setGameState('defeat');
            } else {
              newQuestion();
            }
          }, 1000);
        } else if (enemyClass === 'rogue') {
          addLog('Enemy prepares Perfect Strike!');
          setEnemyAnimation('heal');
          setTimeout(() => {
            setEnemyAnimation('');
            newQuestion();
          }, 1000);
        } else if (enemyClass === 'scholar') {
          const healAmount = 35;
          setEnemyHP(hp => Math.min(maxEnemyHP, hp + healAmount));
          addLog(`Enemy heals ${healAmount} HP!`);
          setEnemyAnimation('heal');
          setTimeout(() => {
            setEnemyAnimation('');
            newQuestion();
          }, 1000);
        }
      } else {
        // Normal attack
        if (enemyNextMove && enemyNextMove.willSucceed) {
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
      }
    }, 2000);
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
      // Wrong answer: take penalty damage, then enemy attacks
      const penaltyResult = applyDamage(20, true);
      setCombo(0);
      setQuestionStreak(0);
      setFeedback(`✗ Wrong! Answer: ${currentQuestion.a}`);
      addLog(`You take ${penaltyResult.actualDamage} penalty damage!`);
      setPlayerAnimation('shake');
      
      setTimeout(() => {
        setPlayerAnimation('');
        if (penaltyResult.newHP <= 0) {
          setGameState('defeat');
        } else {
          // Enemy still gets to attack after wrong answer
          enemyAttack();
        }
      }, 1500);
    }
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
    setEnemyClass(null);
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
    setEnemyClass(null);
  };

  useEffect(() => {
    if (gameState === 'playing' && playerClass) {
      newQuestion();
    }
  }, [gameState, playerClass]);

  useEffect(() => {
    if (gameState === 'playing' && playerClass && currentQuestion) {
      if (timeLeft > 0 && !selectedAnswer && currentTurn === 'player') {
        const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
        return () => clearTimeout(timer);
      } else if (timeLeft === 0 && !selectedAnswer && currentTurn === 'player') {
        handleTimeout();
      }
    }
  }, [gameState, timeLeft, selectedAnswer, currentTurn, playerClass, currentQuestion]);

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
                  max="60"
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
          <div className={`w-32 h-32 bg-gradient-to-br ${enemyClass ? classes[enemyClass].color : 'from-red-500 to-orange-500'} rounded-full flex items-center justify-center mb-2 ${currentTurn === 'enemy' ? 'ring-4 ring-red-400' : ''} ${enemyAnimation}`}>
            {enemyClass ? React.createElement(classes[enemyClass].icon, { className: 'w-16 h-16 text-white' }) : <Target className="w-16 h-16 text-white" />}
          </div>
          <div className="bg-red-600 h-4 rounded-full w-32 mb-1">
            <div className="bg-red-400 h-full" style={{ width: `${(enemyHP / maxEnemyHP) * 100}%` }} />
          </div>
          <p className="text-white font-bold">ENEMY: {enemyHP}/{maxEnemyHP}</p>
          {enemyClass && <p className="text-yellow-300 text-xs font-bold">{classes[enemyClass].name}</p>}
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
