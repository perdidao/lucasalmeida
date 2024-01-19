@code
    Dim cADM As New svcADM
    Dim svcU As New svcADMUsuarios
    If Not cADM.EstouLogado Then
        Response.Redirect("/adm/login.vbhtml")
    End If

    If Not ADM.ADMFactory.NivelPermitido(1) Then
        Response.Redirect("/adm/login.vbhtml")
    End If

    Dim retornoCad As Boolean = False
    If Request("formUsuario") = "formUsuario" And Request("metodo") = "post" Then
        Dim cad As New NsvcADMUsuarios.Usuario
        cad.Nome = Request("nome")
        cad.Email = Request("email")
        If Not String.IsNullOrEmpty(Request("senha")) AndAlso Request("senha") = Request("confsenha") Then
            cad.Senha = Request("senha")
        Else

        End If
        Dim mods = Request("modulos").Split(",")
        Dim total As Integer = 0
        If mods.Count > 0 Then
            For Each x In mods
                If IsNumeric(x) Then
                    total += x
                End If
            Next
        End If
        cad.NivelAcesso = total
        retornoCad = svcU.Cadastra(cad)
        If retornoCad Then
            Response.Redirect("usuarios.vbhtml")
        End If
    End If
    If Request("formUsuario") = "formUsuario" And Request("metodo") = "put" Then
        Dim cad As New NsvcADMUsuarios.Usuario
        cad.ID = Request("id")
        cad.Nome = Request("nome")
        cad.Email = Request("email")
        If Not String.IsNullOrEmpty(Request("senha")) AndAlso Request("senha") = Request("confsenha") Then
            cad.Senha = Request("senha")
        Else

        End If
        Dim mods = Request("modulos").Split(",")
        Dim total As Integer = 0
        If mods.Count > 0 Then
            For Each x In mods
                If IsNumeric(x) Then
                    total += x
                End If
            Next
        End If
        cad.NivelAcesso = total
        retornoCad = svcU.Salva(cad)
        If retornoCad Then
            Response.Redirect("usuarios.vbhtml")
        End If
    End If

    Dim u As New NsvcADMUsuarios.Usuario '= ctx.FindOne(q)
    If IsNumeric(Request("id")) Then
        Dim ctxU = ConexaoMongoDB.GetCollection(Of DB.Usuario)("tbUsuarios")
        Dim q = MongoDB.Driver.Builders.Query.EQ("_id", CInt(Request("id")))
        Dim item As DB.Usuario
        item = ctxU.FindOne(q)
        If Not item Is Nothing Then
            'u = item
            u.Nome = item.Nome
            u.Email = item.Email
            u.NivelAcesso = item.Nivel
            u.Nivel = svcU.FModulos(item.Nivel)
        Else
            u.Nome = ""
            u.Email = ""
            u.Senha = ""
            u.NivelAcesso = 0
            u.Nivel = svcU.FModulos(0)
        End If
    End If

    Dim metodo As String = If(IsNumeric(Request("id")), "put", "post")

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
<body data-retorno="@retornoCad">

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

            <h1>Novo Usuário</h1>

            <br class="clear">

        </header>
        <form method="post">
            <input type="hidden" name="formUsuario" value="formUsuario" />
            <input type="hidden" name="id" value="@Request("id")" />
            <input type="hidden" name="metodo" value="@metodo" />
            <label class="stack-2">
                Nome <span class="required">*</span>
                <input type="text" name="nome" value="@u.Nome">
            </label>

            <label class="stack-2 last">
                E-mail <span class="required">*</span>
                <input type="email" name="email" value="@u.Email">
            </label>

            <label class="stack-2">
                Senha <span class="required">*</span>
                <input type="password" name="senha">
            </label>

            <label class="stack-2 last">
                Confirmação de senha <span class="required">*</span>
                <input type="password" name="confsenha">
            </label>

            <label class="full">
                Módulos permitidos <span class="required">*</span>
                <select multiple="multiple" name="modulos" id="modulos">
                    @For Each m In svcU.Modulos
                    @<option value="@m.Valor" @(If(u.Nivel.Contains(m.Valor), "selected", ""))>@m.Texto</option>
                    Next
                </select>
            </label>

            <p Class="notice"><span class="required">*</span> Campos obrigatórios</p>

            <Button Class="btn btn-laranja f-right">@(If(metodo = "post", "Cadastrar", "Salvar"))</Button>

            <br Class="clear">

        </form>

    </main>

    <footer id="footer" class="center">

        <p>FFW Update © 2015</p>

        <a href="http://www.estudioffw.com" target="_blank" title="Estúdio FFW" class="assinatura">Estúdio FFW</a>

        <br class="clear">

    </footer>

    <Script type="text/javascript" src="js/jquery.js"></Script>
    <Script type="text/javascript" src="js/plugin/modernizr.js"></Script>
    <Script type="text/javascript" src="js/plugin/api.geografica.js"></Script>
    <Script type="text/javascript" src="js/plugin/mask.js"></Script>
    <Script type="text/javascript" src="js/main.js"></Script>
    <Script type="text/javascript" src="js/forms.js"></Script>
</body>
</html>