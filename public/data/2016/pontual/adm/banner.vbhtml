@code
    Dim cADM As New svcADM
    Dim svcU As New svcADMUsuarios
    If Not cADM.EstouLogado Then
        Response.Redirect("/adm/login.vbhtml")
    End If

    If Not ADM.ADMFactory.NivelPermitido(2) Then
        Response.Redirect("/adm/login.vbhtml")
    End If


    Dim retornoCad As Boolean = False
    Dim svcB As New svcADMBanners
    If Request("formBanner") = "formBanner" And Request("metodo") = "post" Then
        Dim cad As New DB.Banner
        cad.Titulo = Request("titulo")
        cad.Token = Request("token")
        If String.IsNullOrEmpty(cad.Token) Then
            retornoCad = False
            GoTo sairCad
        End If

        retornoCad = svcB.CadastraBanner(cad)
        If retornoCad Then
            Response.Redirect("banners.vbhtml")
        End If
    End If
sairCad:

    If Request("formBanner") = "formBanner" And Request("metodo") = "put" Then
        Dim cad As New DB.Banner
        cad.Id = Request("id")
        cad.Titulo = Request("titulo")
        cad.Token = Request("id")

        retornoCad = svcB.SalvaBanner(cad)
        If retornoCad Then
            Response.Redirect("banners.vbhtml")
        End If
    End If


    Dim a As New DB.Banner
    a.Token = svcB.Token
    If IsNumeric(Request("id")) Then
        Dim ctxA = ConexaoMongoDB.GetCollection(Of DB.Banner)("tbBanners")
        Dim q = MongoDB.Driver.Builders.Query.EQ("_id", CInt(Request("id")))
        Dim item As DB.Banner
        item = ctxA.FindOne(q)
        If Not item Is Nothing Then
            a = item
            a.Token = a.Id
        Else
            a.Titulo = ""
            a.Token = svcB.Token
        End If
    End If


    Dim metodo As String = If(IsNumeric(Request("id")), "put", "post")

End code
<!DOCTYPE html>
<!--
*  -/////////////////////////:`         -/.         ./-
*  /MMMMMMMMMMMMMMMMMMMMMMMMMMMy        sMMN`       /NMM:
*  +MMM+///////+MMMy////////mMMh      `yMMMM`      /NMMs
*  +MMM`       `MMM/        hMMh     `yMMMMM`     /NMMs
*  +MMM`       `MMM/        hMMh    `yMMMMMM`    +MMMo
*  +MMM`       `MMM/        hMMh   `yMMNyMMM`   +MMMo
*  +MMM+////////MMMs////////mMMh  `hMMN:/MMM`  +MMMo
*  +MMMMMMMMMMMMMMMMMMMMMMMMMMMh `hMMm- /MMM` oMMM+
*  +MMM+///////+MMMs////////mMMh`hMMm-  /MMM`oMMM+
*  +MMM`       `MMM/        hMMdhMMm-   /MMMsMMM+
*  +MMM`       `MMM/        hMMMMMm-    /MMMMMN/
*  +MMM`       `MMM/        hMMMMm.     /MMMMN/
*  +MMM`       `MMM/        hMMMm.      /MMMN/
*  /MMN`       `NMM/        yMMm.       /MMN/
*   -/.         ./-         `::`         -/.
*  Nós fazemos front-end.
-->
<html lang="pt-BR" itemscope>
<head>
    <meta name="robots" content="noindex, nofollow">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>FFW Update</title>
    <meta name="description" content="Com o UPDATE, o cliente tem total acesso aos módulos para gerenciar os conteúdos de seu site, todas as áreas dinâmicas contratadas estão facilmente disponíveis para atualização pelo cliente.">
    <meta name="author" content="Estúdio FFW">
    <meta name="generator" content="Estúdio FFW">

    <!-- Responsivo -->
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">

    <!-- Ícones -->
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">

    <!-- Dependências -->
    <link rel="stylesheet" type="text/css" href="static/css/main.css">
    <link rel="stylesheet" type="text/css" href="static/css/plugin/icones.css">
</head>
<body>

    <a href="javascript:;" title="" id="mutant"><span></span></a>

    <header id="header">

        <div class="center">

            <a href="index.vbhtml" title="ICOMP Update" id="logo"></a>

            @RenderPage("menu.vbhtml")

            <section id="account">

                <div class="info">

                    <h2>@cADM.DadosLogin.Nome</h2>

                    <a href="javascript:Sair();" title="Clique para sair">Sair</a>

                </div>

                <div class="ico-account"></div>

            </section>

            <br class="clear">

        </div>

    </header>

    <main class="center reduced">

        <header class="main-title-wrapper">

            <h1>Novo banner</h1>

            <br class="clear">

        </header>

        <form method="post">
            <input type="hidden" name="formBanner" value="formBanner" />
            <input type="hidden" name="id" value="@Request("id")" />
            <input type="hidden" name="metodo" value="@metodo" />
            <input type="hidden" name="token" id="token" value="@a.Token" />
            <label class="full">
                Título <span class="required">*</span>
                <input type="text" name="titulo" id="titulo" value="@a.Titulo">
            </label>
            <input type="file" name="imagem" id="imagem" onchange="javascript:fileSelected('imagem');" class="invisivel" accept=".jpg, .png" />
            <button class="btn btn-azul btn-full" onclick="javascript: $('#imagem').trigger('click'); return false;">Banner</button>

            <p class="notice"><span class="required">*</span> Campos obrigatórios</p>

            <button class="btn btn-laranja f-right">@(If(metodo = "post", "Cadastrar", "Salvar")) banner</button>

            <br class="clear">

        </form>
        <br />
        <div id="Nome"></div>
        <div id="Tamanho"></div>
        <div id="Tipo"></div>
        <div id="Progresso"></div>

    </main>

    <footer id="footer" class="center">

        <p>FFW Update © 2015</p>

        <a href="http://www.estudioffw.com" target="_blank" title="Estúdio FFW" class="assinatura">Estúdio FFW</a>

        <br class="clear">

    </footer>

    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/plugin/modernizr.js"></script>
    <script type="text/javascript" src="js/plugin/api.geografica.js"></script>
    <script type="text/javascript" src="js/plugin/mask.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript" src="js/fotos.js"></script>
    <script type="text/javascript" src="js/banners.js"></script>
</body>
</html>