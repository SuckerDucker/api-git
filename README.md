# eva-api
### Prerequisitos
1. Instalar Git.
2. Instalar [NodeJs](https://nodejs.org/en) versión ^16.19.0 o instala la versión de nodeJs mediante [nvm](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/).
```
nvm install 16
nvm use 16
node -v
v16.19.0
```
3. Instalar `yarn` con el siguiente comando `npm install --global yarn`.
4. Clonar el reporsitorio [eva-api](https://github.com/Alexandergv2117/eva-api).

### Base de datos
Crear al base de datos y hacer el backup de la base de datos.

### Instalar eva-api
Crear el archivo `.env` y añadir las variables de entorno.
```
PORT=

NODE_ENV=
DOCS_ENABLED=
auth=

# Database Configuration

DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASS=

ORIGIN_URL_FRONT=
JWT_SECRET=
TOKEN_EXPIRATION=
```


Instalar las dependencias
```
yarn
```
Ejecutar el proyecto en modo desarrollo.
```
yarn dev
```
Ejecutar el proyecto en modo de desarrollo con autenticación. 
```
yarn dev-auth
```

### Esquema de la base de datos
![eva](https://github.com/Alexandergv2117/eva-api/assets/74172014/eb2c90e8-5b10-4a8c-ba7d-c23ee29ca5dd)

#   a p i - g i t  
 