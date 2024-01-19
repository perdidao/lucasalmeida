@code
    Dim ADM As New svcADM
    If Not ADM.EstouLogado Then
        Response.Redirect("/adm/login.vbhtml")
    End If
End Code

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

						<h2>@ADM.DadosLogin.Nome</h2>

                        <a href="javascript:Sair();" title="Clique para sair">Sair</a>

					</div>

					<div class="ico-account"></div>
					
				</section>

				<br class="clear">

			</div>

		</header>

		<main class="center reduced greetings">

			<header class="main-title-wrapper">

				<h1>Bem-vindo ao Update</h1>

				<br class="clear">

			</header>

			<p>Com ele, o cliente tem total acesso aos módulos para gerenciar os conteúdo de seu site. Todas as áreas dinâmicas contratadas estão facilmente disponíveis para atualização pelo cliente.</p>

			<p>Em caso de dificuldades para utilizar o sistema, entre em contato pelo e-mail <span>contato@@estudioffw.com</span>.</p>

		</main>

		<footer id="footer" class="center">

	        <p>FFW Update © 2015</p>

	        <a href="http://www.estudioffw.com" target="_blank" title="Estúdio FFW" class="assinatura">Estúdio FFW</a>

	        <br class="clear">

	    </footer>

		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/plugin/modernizr.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
	</body>
</html>