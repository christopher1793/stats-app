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
        local dataLoaded = exports[phoneResourceName]:GetDataLoaded()
        while not dataLoaded do
            Wait(500)
            dataLoaded = exports[phoneResourceName]:GetDataLoaded()
        end

        exports[phoneResourceName]:AddCustomApp({
            key = key,
            name = "App Template",
            defaultApp = true,
            ui = "https://cfx-nui-" .. GetCurrentResourceName() .. "/ui/dist/index.html", -- built version
            -- ui = "http://localhost:3000", -- dev version
            icon = {
                yos = "https://cdn-icons-png.flaticon.com/512/2314/2314912.png",    -- YPhone OS icon.
                humanoid = "https://cdn-icons-png.flaticon.com/512/566/566312.png", -- YFlip OS icon.
            },
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
            exports[phoneResourceName]:RemoveCustomApp(key)
        end
    end)
end)
