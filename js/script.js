// 質問テキストと選択肢を定義
const questions = [
  { id: 1, text: '質問1' },
  { id: 2, text: '質問2' },
  { id: 3, text: '質問3' },
  { id: 4, text: '質問4' },
  { id: 5, text: '質問5' },
  { id: 6, text: '質問6' },
  { id: 7, text: '質問7' },
  { id: 8, text: '質問8' },
  { id: 9, text: '質問9' },
  { id: 10, text: '質問10' },
  { id: 11, text: '質問11' },
  { id: 12, text: '質問12' },
  { id: 13, text: '質問13' },
  { id: 14, text: '質問14' },
  { id: 15, text: '質問15' },
  { id: 16, text: '質問16' },
  { id: 17, text: '易刺激性' },
  { id: 18, text: '活動性' },
  { id: 19, text: '不安定性' },
  { id: 20, text: '新しさへの反応' },
  { id: 21, text: '感受性' }
];

// 選択肢ラベル
const choices = [
  'まったく当てはまらない',
  'あまり当てはまらない',
  'やや当てはまる',
  'かなり当てはまる'
];

// フォーム要素取得
const form = document.getElementById('question-form');
const submitBtn = document.getElementById('submit-btn');
const resultDiv = document.getElementById('result');
const answerList = document.getElementById('answer-list');
const restartBtn = document.getElementById('restart-btn');

// 質問を動的に生成
function renderQuestions() {
  questions.forEach(({ id, text }) => {
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = `${id}. ${text}`;
    fieldset.appendChild(legend);

    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options';

    choices.forEach((label, idx) => {
      const idAttr = `q${id}_c${idx + 1}`;
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = `q${id}`;
      radio.id = idAttr;
      radio.value = idx + 1;

      const radioLabel = document.createElement('label');
      radioLabel.setAttribute('for', idAttr);
      radioLabel.textContent = label;
      radioLabel.prepend(radio);

      optionsDiv.appendChild(radioLabel);
    });

    fieldset.appendChild(optionsDiv);
    form.insertBefore(fieldset, submitBtn);
  });
}

// フォーム送信ハンドラ
function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const answers = [];

  for (let { id } of questions) {
    const key = `q${id}`;
    const value = formData.get(key);
    if (!value) {
      alert('すべての質問に回答してください。');
      return;
    }
    answers.push({ question: id, answer: value });
  }

  showResult(answers);
}

// サマリー表示
function showResult(answers) {
  form.classList.add('hidden');
  resultDiv.classList.remove('hidden');
  answerList.innerHTML = '';

  answers.forEach(({ question, answer }) => {
    const li = document.createElement('li');
    li.textContent = `${question}：${choices[answer - 1]}（値: ${answer}）`;
    answerList.appendChild(li);
  });
}

// 再回答ボタンハンドラ
function handleRestart() {
  resultDiv.classList.add('hidden');
  form.reset();
  form.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  renderQuestions();
  form.addEventListener('submit', handleSubmit);
  restartBtn.addEventListener('click', handleRestart);
});
