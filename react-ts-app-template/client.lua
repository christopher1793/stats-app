local key = "react-ts-app-template"

---@param action string The action you wish to target
---@param data any The data you wish to send along with this action
function SendUIAction(action, data)
    SendNUIMessage({
        action = action,
        data = data
    })
end

CreateThread(function()
    while GetResourceState("yflip-phone") ~= "started" do
        Wait(500)
    end

    local function AddApp()
        local dataLoaded = exports['yflip-phone']:GetDataLoaded()
        while not dataLoaded do
            Wait(500)
            dataLoaded = exports['yflip-phone']:GetDataLoaded()
        end

        exports["yflip-phone"]:AddCustomApp({
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
        if resource == "yflip-phone" then
            AddApp()
        end
    end)

    RegisterNuiCallback('get-nui-data', function(_, cb)
        cb('I came from client.lua')
    end)

    AddEventHandler("onResourceStop", function(resource)
        if resource == GetCurrentResourceName() then
            exports["yflip-phone"]:RemoveCustomApp(key)
        end
    end)
end)
