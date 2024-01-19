<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="robots" content="index, follow">
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title><?php wp_title(); ?></title>
  <?php wp_head(); ?>
  <meta name="description" content="<?php echo bloginfo('description'); ?>">
  <meta name="theme-color" content="#000">

  <!-- Responsivo -->
  <meta name="viewport" content="width=device-width, user-scalable=no">
  <meta name="apple-mobile-web-app-capable" content="yes">

  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/static/css/plugin/carousel.css">
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/static/fonts/fonts.css">
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/static/css/main.css">
</head>
<body>

  <header id="header">

    <div class="center">

      <a href="<?php bloginfo('url') ?>" class="logo"><img src="<?php echo get_template_directory_uri(); ?>/static/img/logo-inner.png" alt="TERQ"></a>

      <a href="javascript:;" title="" id="btn-menu"><span></span></a>

      <nav class="menu">

        <ul>

          <?php

						$menuParameters = array(
							'theme_location' => 'menu-topo',
							'container'       => false,
							'echo'            => false,
							'items_wrap'      => '%3$s',
							'depth'           => 0,
						);

						echo wp_nav_menu($menuParameters);

					?>

        </ul>

      </nav>

      <br class="clear">
