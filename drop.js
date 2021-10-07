const fs = require('fs')

const requestProxy = require("request").defaults({
  proxy: "http://127.0.0.1:7890",
  rejectUnauthorized: false,
})

const login_url = 'https://discord.com/api/v9/auth/login'
const typing_url = 'https://discord.com/api/v9/channels/_id/typing'
const messages_url = 'https://discord.com/api/v9/channels/_id/messages'
const logout_url = 'https://discord.com/api/v9/auth/logout'

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
const user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36'
const MAGIC = 890383850297884672

async function main() {
  
  if (process.argv.length < 4) {
    console.log('node discord.js password|- channel_id')
    return
  }

  let password1 = process.argv[2]
  let channel_id = process.argv[3]

  let list = fs.readFileSync('drop.txt')
  let lines = list.toString().split('\n')
  
  for (let index in lines) {
    let line = lines[index]
    console.log(++index)
    if (line.startsWith('#')) continue
    let arr = line.split('|')
    if (arr.length != 3) continue
    let user = arr[0]
    let password = arr[1]
    let message = arr[2]
    if (password == '*') {
      if (password1 == '-') {
        console.log('bad password')
        continue
      }
      password = password1
    }
    

    try {
      await worker(user, password, channel_id, message)
    } catch (err) {
      console.log(err)
    }

    break
  }
}

async function worker(user, password, channel_id, message) {

  let headers = {
    'user-agent': user_agent,
  }

  let params = {
    "login": user,
    "password": password,
    "undelete": false,
    "captcha_key": null,
    "login_source": null,
    "gift_code_sku_id": null
  }

  console.log('login')
  let body = await synchronous_request('POST', login_url, params, headers)
  if (body.captcha_key != undefined) {
    console.log(body.captcha_key + '\n')
    
    return
  }
  
  let token = body.token
  if (token == undefined) {
    console.log('login failed\n')

    return
  }

  headers['authorization'] = token

  let _typing_url = typing_url.replace('_id', channel_id)
  await synchronous_request('POST', _typing_url, undefined, headers)
  
  await  wait(5000)
  
  console.log('send message ...')
  let _messages_url = messages_url.replace('_id', channel_id)
  let nonce = MAGIC + new Date().getTime() + Math.floor(Math.random() * 65535)
  params = {
    "content": message,
    "nonce": nonce.toString(),
    "tts": false
  }

  await synchronous_request('POST', _messages_url, params, headers)

  console.log('logout\n')
  params = {
    "provider": null,
    "voip_provider": null
  }

  try {
    await synchronous_request('POST', logout_url, params, headers)
  } catch (err) {
    //
  }

  return
} 

// helper methods
let synchronous_request = function (method, url, params, headers) {

  let options = {
    url: url,
  }

  if (method == 'GET') {
    if (params != undefined) {
      options['form'] = params
    }
    if (headers != undefined) {
      options['headers'] = headers
    }
    
    return new Promise(function (resolve, reject) {
      // If you don't use proxy, require("request").get(...) is ok
      // require("request").get(options, function (error, response, body) {
      requestProxy.get(options, function (error, response, body) {
            if (error) {
                reject(error)
            } else {
                resolve(body)
            }
        })
    })
  } else {
    if (params != undefined) {
      options['json'] = params
    }
    if (headers != undefined) {
      options['headers'] = headers
    }

    return new Promise(function (resolve, reject) {
      // require("request").post(options, function (error, response, body) {
      requestProxy.post(options, function (error, response, body) {
        if (error) {
            reject(error)
        } else {
            resolve(body)
        }
      })
    })
  }
}

main()

