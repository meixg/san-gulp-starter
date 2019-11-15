<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Todos</title>
        <link rel="stylesheet" href="src/index.css">
        <link rel="stylesheet" href="node_modules/font-awesome/css/font-awesome.css">

        <script src="node_modules/esljs/dist/esl.js"></script>
        <script>
            require.config({
                baseUrl: 'src',
                paths: {
                    moment: '../node_modules/moment/moment',
                    jquery: '../node_modules/jquery/dist/jquery',
                    san: '../node_modules/san/dist/san'
                },
                waitSeconds: 3
            });
        </script>
    </head>
    <body>
        <div id="wrap"></div>
        <script>
            require(
                ['app'],
                function (app) {
                    app.init();
                }
            );
        </script>
    </body>
</html>
