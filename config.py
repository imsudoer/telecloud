# region Server

ADMIN_TOKEN = ""
BASE_URL = "https://example.com"
MAX_UPLOAD_SIZE = 2 * 1024 * 1024 * 1024 # 2gb
UPLOAD_FOLDER = 'storage'

# region Telegram

bot_tokens = [
    "",
]

API_ID = 0
API_HASH = ""
FILECHAT = -100
chatid = -100
topicid = 1
errtopicid = 2

# region Security

RPS_LIM = 100 # calls
RATE_STEP_S = 1 # by seconds

BAN_RPS = 100
BAN_STEP_S = 1

BAN_DUR_S = 60 * 60 * 24 # 1d

GLOB_F_LIMIT = 100
GLOB_F_STEP_S = 1

BRUTE_LIMIT = 1
BRUTE_STEP_S = 300