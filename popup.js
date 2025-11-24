async function setGrade(targetGrade) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab || !tab.id) {
    console.error("Не удалось получить активную вкладку");
    return;
  }

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    args: [targetGrade],
    func: (targetGrade) => {
      let totalQuestions = document.querySelector('.homework-personal-stat-number').textContent.split(' ')[0];
      console.log('Всего вопросов:', totalQuestions);
      
      let numberOfQuestions = document.querySelectorAll('.homework-personal-stat-value');
      let ocenka = numberOfQuestions[0];
      let summabaliv = numberOfQuestions[1];
      let resultati = numberOfQuestions[2];
      let progress = document.querySelector('.progress-bar');
      let pravilno = numberOfQuestions[3];
      let nepravilno = numberOfQuestions[4];
      let propusheno = numberOfQuestions[5];
      let chasu = numberOfQuestions[6];
      let serchasu = numberOfQuestions[7];

      let maxOcenka = ocenka.firstElementChild.textContent.split('/')[1];
      let maxBalliv = summabaliv.firstElementChild.textContent.split('/')[1];

      let percentage = (targetGrade / maxOcenka) * 100;
      let correctAnswers = Math.round((targetGrade / maxOcenka) * totalQuestions);
      let incorrectAnswers = totalQuestions - correctAnswers;
      let earnedBalliv = Math.round((targetGrade / maxOcenka) * maxBalliv);

      ocenka.firstElementChild.textContent = `${targetGrade} / ${maxOcenka}`;
      resultati.firstElementChild.textContent = Math.round(percentage);
      summabaliv.firstElementChild.textContent = `${earnedBalliv} / ${maxBalliv}`;
      progress.style.width = `${percentage}%`;
      progress.textContent = `${Math.round(percentage)}%`;
      pravilno.firstElementChild.textContent = correctAnswers;
      nepravilno.firstElementChild.textContent = incorrectAnswers;
      propusheno.firstElementChild.textContent = 0;

      let totalTime = Number(totalQuestions) * (Math.floor(Math.random() * (25 - 12 + 1)) + 12);
      chasu.firstElementChild.textContent = `${totalTime} сек`;
      serchasu.firstElementChild.textContent = `${Math.round(totalTime / Number(totalQuestions))} сек`;
    },
  });
}

document.getElementById("change9").addEventListener("click", () => setGrade(9));
document.getElementById("change10").addEventListener("click", () => setGrade(10));
document.getElementById("change11").addEventListener("click", () => setGrade(11));
document.getElementById("change12").addEventListener("click", () => setGrade(12));