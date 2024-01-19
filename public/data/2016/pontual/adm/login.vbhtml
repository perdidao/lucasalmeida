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
@code
    Dim retorno As Boolean = False
    If request("formLogin")="formLogin" and request.httpmethod.tolower="post" Then
        Dim svcL As New svcADM
        Dim dLog As New NsvcADM.Login
        dLog.Email = Request("login")
        dLog.Senha = Request("senha")

        retorno = svcL.Login(dLog)
        If retorno Then
            Response.Redirect("index.vbhtml")
        End If
    End if
end code
<body class="login-page" data-retorno="retorno">
    <main class="center login">
        <a href="javascript:;" title="ICOMP Update" id="logo"></a>
        <h1>Login</h1>
        <br class="clear">
        <form method="post">
            <input type="hidden" name="formLogin" value="formLogin"></input>
            <label class="full">
                Login
                <input type="text" name="login">
            </label>
            <label class="full">
                Senha
                <input type="password" name="senha">
            </label>
            <button class="btn btn-azul f-right">Acessar</button>
            <br class="clear">
        </form>
    </main>
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/plugin/modernizr.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
</body>
</html>