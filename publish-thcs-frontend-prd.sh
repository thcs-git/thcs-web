#!/bin/bash
# SYSTEM CONFIGURATIONS
image_name="thcs/frontend/web"
last_tag='production'
delete_option=true
push_option=false
login_option=false

# GOOGLE CONFIGURATIONS
gcloud_project_id="aps-tscm"
gcloud_service_account="thcs-registry@aps-tscm.iam.gserviceaccount.com"
gcloud_key_file="thcs-google-credentials.json"

# NODE CONFIGURATION
NODE_ENV="production"
PORT="3010"

# AUTH CONFIGURATION
REACT_APP_CHIPER_KEY="3*uxKrceUko4BUIp70@mq0N=_ujYZK/Z"
REACT_APP_CHIPER_IV="H_HzWBdJ/rl5b9By"

# API CONFIGURATION
REACT_APP_BASE_API="http://35.247.244.122:5010/api"
REACT_APP_BASE_CHATBOT="http://35.247.244.122:5010/chatbot"
REACT_APP_BASE_API_MOBI="http://35.247.244.122:5010/"
REACT_APP_BASE_API_REPORT="http://35.247.244.122:5010/report"
REACT_APP_BASE_API_NEXODATA="http://35.247.244.122:5010/nexodata"

# HOST CONFIGURATION
REACT_APP_BASE_MAP=http://35.247.244.122:3015

# CORREIOS CONFIGURATION
REACT_APP_CORREIOS_API=https://viacep.com.br/ws/
REACT_APP_IBGE_API=https://servicodados.ibge.gov.br/api/v1
REACT_APP_VIACEP_API=https://viacep.com.br/ws/

# GOOGLE MAPS CONFIGURATIONS
REACT_APP_GOOGLE_API_KEY="AIzaSyA5ynBs1BxZYrCebESiQloFSZIiALVBGzg"
REACT_APP_GOOGLE_MAPS_API="https://maps.googleapis.com/maps/api"

process() {
  while test $# -gt 0; do
    case "$1" in
    -h | --help)
      show_help
      return 1
      ;;
    -t | --tag)
      shift
      validate_empty_option_value "-d" "$1"
      last_tag=$1
      shift
      ;;
    -l | --login)
      shift
      login_option=true
      shift
      ;;
    --push)
      shift
      push_option=true
      shift
      ;;
    -d | --delete)
      shift
      validate_empty_option_value "-d" "$1"
      validate_boolean "-d" "$1"
      delete_option=$1
      shift
      ;;
    -p | --project)
      shift
      validate_empty_option_value "-d" "$1"
      gcloud_project_id=$1
      shift
      ;;
    -s | --service-account)
      shift
      validate_empty_option_value "-d" "$1"
      gcloud_service_account=$1
      shift
      ;;
    -k | --key-file)
      shift
      validate_empty_option_value "-d" "$1"
      gcloud_key_file=$1
      shift
      ;;
    *)
      echo "Opção $1 é inválida!"
      show_help
      return 1
      ;;
    esac
  done
  build_image
}

build_image() {
  if [ "$login_option" = true ]; then
    docker_login
  fi

  image_build

  if [ "$push_option" = true ]; then
    image_push
  fi

  if [ "$delete_option" = true ]; then
    delete_local_images
  fi
}

docker_login() {
  echo -e "\nFazendo login no google cloud\n"
  gcloud auth activate-service-account "$gcloud_service_account" --key-file="$gcloud_key_file"

  echo -e "\nMudando para o projeto $gcloud_project_id\n"
  gcloud config set project "$gcloud_project_id"

  echo -e "\nConfigurando o Docker\n"
  gcloud auth configure-docker
}

image_build() {
  echo -e "\nBuildando a imagem $image_name e aplicando a tag $last_tag\n"
  docker build -t ${image_name}:"${last_tag}" --build-arg NODE_ENV="$NODE_ENV" --build-arg PORT="$PORT" --build-arg REACT_APP_CHIPER_KEY="$REACT_APP_CHIPER_KEY" --build-arg REACT_APP_CHIPER_IV="$REACT_APP_CHIPER_IV" --build-arg REACT_APP_BASE_API="$REACT_APP_BASE_API" --build-arg REACT_APP_BASE_CHATBOT="$REACT_APP_BASE_CHATBOT" --build-arg REACT_APP_BASE_API_MOBI="$REACT_APP_BASE_API_MOBI" --build-arg REACT_APP_BASE_API_REPORT="$REACT_APP_BASE_API_REPORT" --build-arg REACT_APP_BASE_API_NEXODATA="$REACT_APP_BASE_API_NEXODATA" --build-arg REACT_APP_BASE_MAP="$REACT_APP_BASE_MAP" --build-arg REACT_APP_CORREIOS_API="$REACT_APP_CORREIOS_API" --build-arg REACT_APP_IBGE_API="$REACT_APP_IBGE_API" --build-arg REACT_APP_VIACEP_API="$REACT_APP_VIACEP_API" --build-arg REACT_APP_GOOGLE_API_KEY="$REACT_APP_GOOGLE_API_KEY" --build-arg REACT_APP_GOOGLE_MAPS_API="$REACT_APP_GOOGLE_MAPS_API" .
}

image_push() {
  echo -e "\nAplicando a tag na imagem $image_name:$last_tag\n"
  docker tag ${image_name}:"${last_tag}" gcr.io/"$gcloud_project_id"/$image_name:"$last_tag"

  echo -e "\nPublicando a imagem $image_name:$last_tag\n"
  docker push gcr.io/"$gcloud_project_id"/$image_name:"$last_tag"
}

delete_local_images() {
  images_founded=$(docker images --format '{{.Repository}}:{{.Tag}}' | grep -v gcr.io | grep "${image_name}")

  if [ ! -z "$images_founded" ]; then
    running_containers=$(docker ps -a | grep "${image_name}")

    if [ ! -z "$running_containers" ]; then
      echo -e "\nParando e apagando localmente containers da imagem ${image_name}\n"
      container_id_columns=$(echo "$running_containers" | awk '{print $1}')
      docker stop "$container_id_columns"
      docker rm "$container_id_columns"
    fi

    echo -e "\nApagando localmente as imagens publicadas de ${image_name}\n"
    for i in $images_founded; do
      echo -e "\nApagando imagem ${i}\n"
      docker rmi "$i" -f
    done
  fi
}

show_help() {
  echo -e "\n-t, --tag\n" \
    "\n\t Default: dev" \
    "\n\t Tag customizada para aplicar na imagem" \
    "\n\t Valor: any\n" \
    "\n\n-l, --login\n" \
    "\n\t Default: false" \
    "\n\t Faz o login no gcp com a conta de serviço configurada" \
    "\n\t Valor: none\n" \
    "\n\n-l, --login\n" \
    "\n\t Default: false" \
    "\n\t Faz o push da imagem local pára o gcp" \
    "\n\t Valor: none\n" \
    "\n\n--delete\n" \
    "\n\t Default: true" \
    "\n\t Deleta todas as imagens publicadas de ${image_name} e as não referenciadas por nenhum container (docker prune -a -f) após o docker push" \
    "\n\t Valor: true | false\n" \
    "\n-h, --help\n" \
    "\n\t Exibe o help"
  exit
}

validate_empty_option_value() {
  if [ -z "$2" ]; then
    echo -e "Valor da opção $1 não informado.\n"
    show_help
    exit
  fi
}

validate_boolean() {
  case "$2" in
  true) ;;
  false) ;;
  *)
    echo -e "Valor da opção $1 é invalido.\n"
    echo -e "Valores pemitidos são: true ou false.\n"
    exit
    ;;
  esac
}

process "$@"
