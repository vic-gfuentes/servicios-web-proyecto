using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using servicios_web_proyecto.Context;
using servicios_web_proyecto.DAO;
using servicios_web_proyecto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace servicios_web_proyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsAccountsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PaymentsAccountsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<PaymentsAccountsController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.PaymentsAccounts.Include(u => u.User).AsNoTracking().ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<PaymentsAccountsController>/5
        [HttpGet("{id}", Name = "GetPaymentsAccount")]
        public ActionResult Get(int id)
        {
            try
            {
                var paymentsAccount = _context.PaymentsAccounts.Include(u => u.User).AsNoTracking().First(ct => ct.PaymentsAccountId == id);
                return Ok(paymentsAccount);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<PaymentsAccountsController>
        [HttpPost]
        public ActionResult Post([FromBody] PaymentsAccountDAO paymentsAccountDAO)
        {
            try
            {
                var paymentsAccount = new PaymentsAccount();
                var user = _context.Users.Single(item => item.UserId == paymentsAccountDAO.UserId);

                paymentsAccount.AccountNumber = paymentsAccountDAO.AccountNumber;
                paymentsAccount.Type = paymentsAccountDAO.Type;
                paymentsAccount.CVV = paymentsAccountDAO.CVV;
                paymentsAccount.AccountPassword = paymentsAccountDAO.AccountPassword;
                paymentsAccount.User = user;

                _context.PaymentsAccounts.Add(paymentsAccount);
                _context.SaveChanges();
                Binnacle.LogRecord(_context, "add", paymentsAccountDAO);

                return CreatedAtRoute("GetPaymentsAccount", new { id = paymentsAccount.PaymentsAccountId }, paymentsAccount);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<PaymentsAccountsController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] PaymentsAccountDAO paymentsAccountDAO)
        {
            try
            {
                if (paymentsAccountDAO.PaymentsAccountId == id)
                {
                    var paymentsAccount = _context.PaymentsAccounts.Single(item => item.PaymentsAccountId == paymentsAccountDAO.PaymentsAccountId);
                    var user = _context.Users.Single(item => item.UserId == paymentsAccountDAO.UserId);

                    paymentsAccount.AccountNumber = paymentsAccountDAO.AccountNumber;
                    paymentsAccount.Type = paymentsAccountDAO.Type;
                    paymentsAccount.CVV = paymentsAccountDAO.CVV;
                    paymentsAccount.AccountPassword = paymentsAccountDAO.AccountPassword;
                    paymentsAccount.User = user;

                    _context.Entry(paymentsAccount).State = EntityState.Modified;
                    _context.SaveChanges();
                    Binnacle.LogRecord(_context, "update", paymentsAccountDAO);

                    return CreatedAtRoute("GetPaymentsAccount", new { id = paymentsAccount.PaymentsAccountId }, paymentsAccount);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<PaymentsAccountsController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var paymentsAccount = _context.PaymentsAccounts.First(ct => ct.PaymentsAccountId == id);
                if (paymentsAccount != null)
                {
                    _context.PaymentsAccounts.Remove(paymentsAccount);
                    _context.SaveChanges();
                    Binnacle.LogRecord(_context, "delete", paymentsAccount);

                    return Ok(paymentsAccount);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
