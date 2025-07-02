

function getWeatherEmoji(main) {
    switch (main.toLowerCase()) {
        case 'clear':
            return '☀️';
        case 'clouds':
            return '☁️';
        case 'rain':
            return '🌧️';
        case 'drizzle':
            return '🌦️';
        case 'thunderstorm':
            return '⛈️';
        case 'snow':
            return '❄️';
        case 'mist':
        case 'fog':
        case 'haze':
            return '🌫️';
        default:
            return '🌡️';
    }
}

async function consultarTempo() {
    const cidade = document.getElementById("cidade").value.trim();
    const resultado = document.getElementById("resultado");

    if (!cidade) {
        resultado.innerHTML = "<span style='color:#c0392b'>Por favor, digite o nome da cidade.</span>";
        return;
    }

    const apiKey = "f2a6315d16c09bca13e7d9ac4376b855"; // chave do OpenWeatherMap aqui
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${apiKey}&units=metric&lang=pt`;

    resultado.innerHTML = "Consultando...";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Cidade não encontrada!");
        }
        const dados = await response.json();
        const iconUrl = `https://openweathermap.org/img/wn/${dados.weather[0].icon}@4x.png`;
        const emoji = getWeatherEmoji(dados.weather[0].main);

        resultado.innerHTML = `
            <div class="weather-card">
                <img src="${iconUrl}" alt="Ícone do tempo" title="${dados.weather[0].description}">
                <div class="weather-temp">${Math.round(dados.main.temp)}°C ${emoji}</div>
                <div class="weather-desc">${dados.weather[0].description}</div>
                <div class="weather-extra">
                    <b>Cidade:</b> ${dados.name}, ${dados.sys.country}<br>
                    <b>Sensação térmica:</b> ${Math.round(dados.main.feels_like)}°C<br>
                    <b>Umidade:</b> ${dados.main.humidity}%<br>
                    <b>Vento:</b> ${dados.wind.speed} m/s
                </div>
            </div>
        `;
    } catch (error) {
        resultado.innerHTML = "<span style='color:#c0392b'>Cidade não encontrada ou erro na consulta.</span>";
    }
}