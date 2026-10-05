const data = {
    produtos: [
        {
            id: 1,
            nome: "iPhone 15",
            preco: 4999.90,
            categoria: "Celulares",
            imagem: "https://placehold.co/200x150?text=iPhone+15",
            descricao: "Smartphone Apple iPhone 15 com 128GB.",
            emEstoque: true
        },
        {
            id: 2,
            nome: "Galaxy S24",
            preco: 3999.90,
            categoria: "Celulares",
            imagem: "https://placehold.co/200x150?text=Galaxy+S24",
            descricao: "Smartphone Samsung Galaxy S24.",
            emEstoque: true
        },
        {
            id: 3,
            nome: "Notebook Lenovo",
            preco: 2899.90,
            categoria: "Notebooks",
            imagem: "https://placehold.co/200x150?text=Notebook+Lenovo",
            descricao: "Notebook Lenovo para estudos e trabalho.",
            emEstoque: true
        },
        {
            id: 4,
            nome: "Notebook Acer",
            preco: 3199.90,
            categoria: "Notebooks",
            imagem: "https://placehold.co/200x150?text=Notebook+Acer",
            descricao: "Notebook Acer com ótimo desempenho.",
            emEstoque: false
        },
        {
            id: 5,
            nome: "Mouse Gamer",
            preco: 149.90,
            categoria: "Acessórios",
            imagem: "https://placehold.co/200x150?text=Mouse+Gamer",
            descricao: "Mouse gamer com iluminação RGB.",
            emEstoque: true
        },
        {
            id: 6,
            nome: "Teclado Mecânico",
            preco: 249.90,
            categoria: "Acessórios",
            imagem: "https://placehold.co/200x150?text=Teclado+Mecanico",
            descricao: "Teclado mecânico para jogos e trabalho.",
            emEstoque: true
        },
        {
            id: 7,
            nome: "Minecraft",
            preco: 99.90,
            categoria: "Games",
            imagem: "https://placehold.co/200x150?text=Minecraft",
            descricao: "Jogo Minecraft para PC.",
            emEstoque: true
        },
        {
            id: 8,
            nome: "EA Sports FC 26",
            preco: 299.90,
            categoria: "Games",
            imagem: "https://placehold.co/200x150?text=EA+Sports+FC+26",
            descricao: "Jogo de futebol EA Sports FC 26.",
            emEstoque: false
        }
    ]
};

// Seleção dos elementos
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

// Formata o preço
function formatPrice(preco) {
    return preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Cria um card de produto
function createProductCard(produto) {
    const card = document.createElement("div");

    card.setAttribute("data-id", produto.id);
    card.classList.add("card");

    // Uso obrigatório de style pelo enunciado
    card.style.padding = "15px";

    const imagem = document.createElement("img");
    imagem.setAttribute("src", produto.imagem);
    imagem.setAttribute("alt", produto.nome);

    const nome = document.createElement("h3");
    nome.innerHTML = produto.nome;

    const preco = document.createElement("p");
    preco.innerHTML = "<strong>Preço:</strong> " + formatPrice(produto.preco);

    const categoria = document.createElement("p");
    categoria.innerHTML = "<strong>Categoria:</strong> " + produto.categoria;

    const btnDetalhes = document.createElement("button");
    btnDetalhes.innerHTML = "Ver detalhes";

    btnDetalhes.addEventListener("click", function () {
        showProductDetails(produto);
    });

    const btnDestacar = document.createElement("button");
    btnDestacar.innerHTML = "Destacar";

    btnDestacar.addEventListener("click", function () {
        card.classList.add("highlight");
    });

    card.appendChild(imagem);
    card.appendChild(nome);
    card.appendChild(preco);
    card.appendChild(categoria);
    card.appendChild(btnDetalhes);
    card.appendChild(btnDestacar);

    return card;
}

// Mostra os produtos
function renderProducts(produtos) {
    productList.innerHTML = "";

    produtos.forEach(function (produto) {
        const card = createProductCard(produto);
        productList.appendChild(card);
    });

    // querySelectorAll obrigatório
    const cards = document.querySelectorAll(".card");

    cards.forEach(function (card) {
        console.log("Card renderizado - data-id:", card.getAttribute("data-id"));
    });
}

// Preenche as categorias
function renderCategories() {
    const categorias = [];

    data.produtos.forEach(function (produto) {
        if (!categorias.includes(produto.categoria)) {
            categorias.push(produto.categoria);
        }
    });

    categorySelect.innerHTML = '<option value="Todas">Todas</option>';

    categorias.forEach(function (categoria) {
        const option = document.createElement("option");

        option.setAttribute("value", categoria);
        option.innerHTML = categoria;

        categorySelect.appendChild(option);
    });
}

// Mostra detalhes
function showProductDetails(produto) {
    const estoque = produto.emEstoque ? "Em estoque" : "Fora de estoque";

    productDetails.innerHTML = `
        <h3>${produto.nome}</h3>
        <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Status:</strong> ${estoque}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
    `;
}

// Filtra os produtos
function filterProducts() {
    const texto = searchInput.value.toLowerCase();
    const categoria = categorySelect.value;

    const produtosFiltrados = data.produtos.filter(function (produto) {
        const nomeCombina = produto.nome.toLowerCase().includes(texto);

        const categoriaCombina =
            categoria === "Todas" || produto.categoria === categoria;

        return nomeCombina && categoriaCombina;
    });

    return produtosFiltrados;
}

// Eventos
searchInput.addEventListener("input", function () {
    renderProducts(filterProducts());
});

categorySelect.addEventListener("change", function () {
    renderProducts(filterProducts());
});

btnRender.addEventListener("click", function () {
    renderProducts(filterProducts());
});

// Inicialização
renderCategories();
renderProducts(data.produtos);