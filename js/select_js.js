document.addEventListener('DOMContentLoaded', function () {
  // Ваш JavaScript код здесь
  const sectionTextMap = {
    'moskov': 'Москва',
    'spb': 'Санкт-Петербург',
    'kazan': 'Казань',
    'sochi': 'Сочи'
  };

  // Полифилл для метода forEach для NodeList
  if (window.NodeList && !NodeList.prototype.forEach) {
  	NodeList.prototype.forEach = function (callback, thisArg) {
  		thisArg = thisArg || window;
  		for (var i = 0; i < this.length; i++) {
  			callback.call(thisArg, this[i], i, this);
  		}
  	};
  }


  document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
  	const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
  	const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
  	const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
  	const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

  	// Клик по кнопке. Открыть/Закрыть select
  	dropDownBtn.addEventListener('click', function (e) {
  		dropDownList.classList.toggle('dropdown__list--visible');
          this.classList.add('dropdown__button--active');
  	});

  	// Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
    dropDownListItems.forEach(function (listItem) {
      listItem.addEventListener('click', function (e) {
        e.stopPropagation();
        dropDownBtn.innerText = this.innerText;
        dropDownBtn.focus();
        dropDownInput.value = this.dataset.value;
        dropDownList.classList.remove('dropdown__list--visible');

        // Получить id секции из атрибута data-id и переместиться к ней
        const sectionId = this.dataset.id;
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  	// Клик снаружи дропдауна. Закрыть дропдаун
  	document.addEventListener('click', function (e) {
  		if (e.target !== dropDownBtn) {
  			dropDownBtn.classList.remove('dropdown__button--active');
  			dropDownList.classList.remove('dropdown__list--visible');
  		}
  	});

  	// Нажатие на Tab или Escape. Закрыть дропдаун
  	document.addEventListener('keydown', function (e) {
  		if (e.key === 'Tab' || e.key === 'Escape') {
  			dropDownBtn.classList.remove('dropdown__button--active');
  			dropDownList.classList.remove('dropdown__list--visible');
  		}
  	});
  });


  document.addEventListener('scroll', function () {
    const dropdown = document.querySelector('.dropdown');
    const scrollY = window.scrollY;
    const threshold = 100; // Расстояние от верхней грани страницы, при котором происходит закрепление
    const sections = document.querySelectorAll('section'); // Элементы секций

    let currentSection = null;
    console.log(sections.length)
    // Определите текущую секцию на основе положения прокрутки

    for (let i = 0; i < sections.length; i++) {
      console.log(sections[i])
      const section = sections[i];
      const sectionTop = section.offsetTop - threshold;
      const sectionBottom = sectionTop + section.clientHeight;

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        currentSection = section.getAttribute('id');
        break;
      }
    }

    if (currentSection) {
      const newText = sectionTextMap[currentSection];
      if (newText) {
        dropdown.querySelector('.dropdown__button').innerText = newText;
      }
    }

    // Закрепление класса .dropdown
    if (scrollY >= threshold) {
      dropdown.classList.add('sticky');
    } else {
      dropdown.classList.remove('sticky');
    }

    // Вывод текущей секции в консоль (для отладки)
    console.log('Текущая секция:', currentSection);
  });

});
