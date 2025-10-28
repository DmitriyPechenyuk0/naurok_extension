document.getElementById("change").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab || !tab.id) {
    console.error("Не удалось получить активную вкладку");
    return;
  }

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
        let totalQuestions = document.querySelector('.homework-personal-stat-number').textContent.split(' ')[0];
        console.log(totalQuestions)
        let numberOfQuestions = document.querySelectorAll('.homework-personal-stat-value');
        let ocenka = numberOfQuestions[0];
        let summabaliv = numberOfQuestions[1];
        let resultati = numberOfQuestions[2];
        let progress = document.querySelector('.progress-bar')
        let pravilno = numberOfQuestions[3];
        let nepravilno = numberOfQuestions[4];
        let propusheno = numberOfQuestions[5];
        let chasu = numberOfQuestions[6];
        let serchasu = numberOfQuestions[7];

        
        let maxOcenka= ocenka.firstElementChild.textContent.split('/')[1];
        ocenka.firstElementChild.textContent = `${maxOcenka} / ${maxOcenka}`;
        resultati.firstElementChild.textContent = 100;
        summabaliv.firstElementChild.textContent = `${ summabaliv.firstElementChild.textContent.split('/')[1] } / ${ summabaliv.firstElementChild.textContent.split('/')[1] }`;
        progress.style.width = "100%";
        progress.textContent = "100%";
        pravilno.firstElementChild.textContent = totalQuestions;
        nepravilno.firstElementChild.textContent = 0;
        propusheno.firstElementChild.textContent = 0;
        chasu.firstElementChild.textContent =  `${Number(totalQuestions) * (Math.floor(Math.random() * (25 - 12 + 1)) + 12)} сек`;
        serchasu.firstElementChild.textContent = `${Number(chasu.firstElementChild.textContent.split(' ')[0]) / Number(totalQuestions)} сек`;
    },
  });
});
