local key = "react-ts-app-template"
local phoneResourceName = "yseries" -- options:  "yflip-phone", "yphone", "yseries"

---@param action string The action you wish to target
---@param data any The data you wish to send along with this action
function SendUIAction(action, data)
    SendNUIMessage({
        action = action,
        data = data
    })
end

CreateThread(function()
    while GetResourceState(phoneResourceName) ~= "started" do
        Wait(500)
    end

    local function AddApp()
        local dataLoaded = exports['yseries']:GetDataLoaded()
        while not dataLoaded do
            Wait(500)
            dataLoaded = exports['yseries']:GetDataLoaded()
        end

        exports['yseries']:AddCustomApp({
            key = key,
            name = "App Template",
            defaultApp = true,
            ui = "https://cfx-nui-" .. GetCurrentResourceName() .. "/ui/dist/index.html", -- built version
            -- ui = "http://localhost:3000", -- dev version
            icon = "https://i.ibb.co/QY127HV/app-icon-placeholder.png"
        })
    end

    AddApp()

    AddEventHandler("onResourceStart", function(resource)
        if resource == phoneResourceName then
            AddApp()
        end
    end)

    RegisterNuiCallback('get-nui-data', function(_, cb)
        cb('I came from client.lua')
    end)

    AddEventHandler("onResourceStop", function(resource)
        if resource == GetCurrentResourceName() then
            exports['yseries']:RemoveCustomApp(key)
        end
    end)
end)
