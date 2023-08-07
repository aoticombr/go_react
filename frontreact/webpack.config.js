const DotenvWebpackPlugin  = require('dotenv-webpack');

  module.exports = {
	// outras configurações do webpack...
	plugins: [
	  new DotenvWebpackPlugin({
		path: './.env.dev'
	  }),
	  new webpack.ProvidePlugin({
		  React: 'react',
		  $: "jquery",
		  jQuery: "jquery"
	  })
	]
  };  
