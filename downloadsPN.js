// Функция для сохранения данных в файл
function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

// Функция для сбора данных с текущей страницы
function collectData() {
    return Array.from(document.querySelectorAll('span.man-fio')).map(span => span.textContent);
}

// Функция для навигации на следующую страницу
function goToNextPage() {
    const nextButton = document.querySelector('span.paginationArrow.active[ng-click="nextPage()"]');
    if (nextButton) {
        nextButton.click();
        return true;
    }
    return false;
}

// Основная функция для сбора данных со всех страниц
async function collectAllData() {
    let allResults = [];
    let hasNextPage = true;

    while (hasNextPage) {
        // Ждем загрузку страницы
        await new Promise(resolve => setTimeout(resolve, 2000)); // ожидание загрузки страницы, 2 секунды

        // Сбор данных с текущей страницы
        const pageResults = collectData();
        allResults = allResults.concat(pageResults);

        // Переход на следующую страницу
        hasNextPage = goToNextPage();
    }

    // Сохранение всех данных в файл
    const resultString = allResults.join('\n');
    download(resultString, 'results.txt', 'text/plain');
}

// Запуск сбора данных
collectAllData();
