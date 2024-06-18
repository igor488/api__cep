//função para obter informaçao do cep 
async function getCepInfo() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length !== 8) {
        alert('CEP inválido. Digite um CEP com 8 dígitos.');
        return;
    }

    //buscando informaçao do cep na api
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        // Verifica se a API retornou um erro
        if (data.erro) {
            alert('CEP não encontrado.');

            // Oculta o link para o Google Maps
            document.getElementById('mapLinkContainer').style.display = 'none';
            return;
        }

        // Cria uma string com o endereço formatado

        const endereco = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
        document.getElementById('endereco').value = endereco;

        // Obtém o elemento do link para o Google Maps
        const mapLink = document.getElementById('mapLink');
        mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
        document.getElementById('mapLinkContainer').style.display = 'block';
    } catch (error) {
        console.error('Erro ao consultar o CEP:', error);
        alert('Erro ao consultar o CEP. Tente novamente mais tarde.');
    }
}

// Adiciona um ouvinte de evento ao botão de consulta para chamar a função getCepInfo ao clicar
document.getElementById('btnConsultar').addEventListener('click', getCepInfo);