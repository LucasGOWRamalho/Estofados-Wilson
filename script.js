// Referência aos elementos do DOM
const monthYearElement = document.getElementById("month-year");
const datesElement = document.getElementById("dates");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

// Dados de meses e ano atuais
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Nomes dos meses para exibir
const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

// Função para atualizar o calendário
function updateCalendar() {
  // Atualizar o cabeçalho com o mês e ano atuais
  monthYearElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  // Limpar as datas antes de preenchê-las novamente
  datesElement.innerHTML = "";

  // Configurar o primeiro dia do mês e o número total de dias do mês
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Preencher com dias vazios até o primeiro dia do mês
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("empty-date");
    datesElement.appendChild(emptyCell);
  }

  // Preencher as datas do mês
  for (let day = 1; day <= totalDays; day++) {
    const dateCell = document.createElement("div");
    dateCell.classList.add("date");
    dateCell.textContent = day;
    datesElement.appendChild(dateCell);
  }
}

// Funções para navegação entre os meses
prevMonthBtn.addEventListener("click", () => {
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear -= 1;
  } else {
    currentMonth -= 1;
  }
  updateCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear += 1;
  } else {
    currentMonth += 1;
  }
  updateCalendar();
});

// Inicializa o calendário com o mês atual
updateCalendar();




// Seleciona todas as seções de conteúdo
const sections = document.querySelectorAll('.content-section');

// Função para exibir apenas a seção correspondente ao link clicado
function showSection(sectionId) {
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

// Adiciona evento aos links da barra lateral para alternar seções
document.querySelectorAll('.item-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Evita o comportamento padrão do link
        const sectionId = link.getAttribute('href').substring(1); // Obtém o ID da seção
        showSection(sectionId);
    });
});

// Exibe a primeira seção por padrão (por exemplo, Agenda)
showSection('agenda');
