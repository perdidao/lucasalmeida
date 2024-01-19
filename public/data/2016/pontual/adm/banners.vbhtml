@code
    Dim cADM As New svcADM
    Dim svcU As New svcADMUsuarios
    If Not cADM.EstouLogado Then
        Response.Redirect("/adm/login.vbhtml")
    End If

    If Not ADM.ADMFactory.NivelPermitido(2) Then
        Response.Redirect("/adm/login.vbhtml")
    End If


    Dim svcB As New svcADMBanners

    Dim pg As Integer = 0
    If IsNumeric(Request("pg")) AndAlso Request("pg") > 0 Then
        pg = Int(Request("pg"))
    End If

    Dim totItens As Integer = svcB.QtdeBanners
    Dim totPG As Integer = 0
    If Int(totItens / 12) < (totItens / 12) Then
        totPG = Int(totItens / 12) + 1
    Else
        totPG = Int(totItens / 12)
    End If
    Dim pgAnt As Integer = 0
    Dim pgProx As Integer = 0
    Dim pgUltima As Integer = 0
    If totPG > 0 Then
        pgUltima = totPG - 1
    End If
    If pgUltima < 0 Then
        pgUltima = 0
    End If
    If pg > 0 Then
        pgAnt = pg - 1
    End If
    If pg < totPG - 1 Then
        pgProx = pg + 1
    End If

    Dim pgInicio As Integer
    Dim pgTermino As Integer
    pgInicio = pg - 1
    If pgInicio < 0 Then
        pgInicio = 0
    End If
    pgTermino = pg + 1
    If pgTermino > totPG - 1 Then
        pgTermino = totPG - 1
    End If

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

    <main class="center">

        <header class="main-title-wrapper">

            <h1>Banners</h1>

            <a href="banner.vbhtml" title="Cadastrar banner" class="btn btn-azul">Novo banner</a>

            <br class="clear">

        </header>

        <ul class="contratantes">

            @For Each a In svcB.ListaBanners(pg, 12)
                @<li>

                    <div class="acoes">

                        <a href="banner.vbhtml?id=@a.Id" title="Editar"><i class="fa fa-pencil"></i></a>

                        <a href="javascript:apagaBanner(@a.Id);" title="Excluir"><i class="fa fa-trash-o"></i></a>

                    </div>

                    <p class="nome">@a.Titulo</p>

                    <p class="extensao">@a.DHC</p>

                </li>
            Next

        </ul>

        <br class="clear">

        <ul class="paginacao">
            <li><a href="banners.vbhtml?pg=@pgAnt" title="Vá para a página anterior"><i class="fa fa-arrow-left"></i></a></li>
            @For x As Integer = pgInicio To pgTermino
                @<li><a href="banners.vbhtml?pg=@(x)" title="Vá para a página @x" class="@(If((x) = pg, "atual", ""))">@(x + 1)</a></li>
            Next

            <li><a href="banners.vbhtml?pg=@pgUltima" title="Vá para a última página" Class="ultima">...</a></li>
            <li><a href="banners.vbhtml?pg=@pgProx" title="Vá para a próxima página"><i Class="fa fa-arrow-right"></i></a></li>
        </ul>

    </main>

    <footer id="footer" class="center">

        <p>FFW Update © 2015</p>

        <a href="http://www.estudioffw.com" target="_blank" title="Estúdio FFW" class="assinatura">Estúdio FFW</a>

        <br class="clear">

    </footer>

    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/plugin/modernizr.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript" src="js/banners.js"></script>
</body>
</html>